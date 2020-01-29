import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  selectedCategories: Category[] = [];
  availableCategories: Category[] = [];
  @Output() private categoryIDs = new EventEmitter<number[]>();

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {
    this.search = this.search.bind(this);
  }

  ngOnInit() {
    this.form = this.fb.group({
      Categories: this.fb.control([], [Validators.required])
    });
    this.form.controls.Categories.valueChanges.subscribe(value => {
      this.filterCategories(value);
    });
  }

  filterCategories(searchTerm: string): void {
    if (this.form.controls.Categories.value === '') {
      return;
    }

    this.categoryService.getAll(searchTerm).subscribe(result => {
      this.availableCategories = [];
      const results = Array.isArray(result) ? Array.from(result) : [];
      if (results.length > 0) {
        for (const obj of results) {
          this.availableCategories.push(obj);
        }
      }
    });
  }
  isCategorySelected(category: Category): boolean {
    if (this.selectedCategories.filter(cat => cat.name === category.name).length > 0) {
      return true;
    }
    return false;
  }
  selectCategory(): void {
    if (this.form.value.Categories.id) {
      if (this.isCategorySelected(this.form.value.Categories)) {
        this.toastr.error('This category is already assigned to question', 'Error', {
          timeOut: 3000
        });
        this.form.controls.Categories.reset();
        return;
      }
      this.selectedCategories.push(this.form.value.Categories);
      this.form.controls.Categories.reset();
      this.emitChange();
      return;
    }
    const inputText: string = this.form.value.Categories;
    if (inputText.trim() === '') {
      return;
    }
    this.addCategory();
    this.form.controls.Categories.reset();
  }

  addCategory(): void {
    const newCategoryName: string = this.form.get('Categories').value;
    this.categoryService.postCategory(newCategoryName).subscribe(newCategory => {
      if (this.isCategorySelected(newCategory)) {
        this.toastr.error('This category is already assigned to question', 'Error', {
          timeOut: 3000
        });
        return;
      }
      this.selectedCategories.push(newCategory);
      this.toastr.success('Category successfully added to database', 'Success');
      this.emitChange();
    });
  }

  emitChange = () => this.categoryIDs.emit(this.selectedCategories.map(x => x.id));

  removeCategory(cat: Category): void {
    const index = this.selectedCategories.indexOf(cat);
    this.selectedCategories.splice(index, 1);
    this.emitChange();
  }

  formatter = (cat: Category) => cat.name;

  search(text$: Observable<string>): Observable<Category[]> {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      map(term =>
        this.availableCategories
          .filter(categories => new RegExp(term, 'mi').test(categories.name))
          .slice(0, 10)
      )
    );
  }
}
