import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ICategory } from '../../models/ICategory';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  names: string[] = [];
  categoryList: ICategory[];
  newCategory: string;
  newCategoryId: number;
  categoryIds: number[] = [];
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      Categories: []
    });

    this.form.controls['Categories'].valueChanges.subscribe(value => {
      this.filterCategories(value);
    });
  }

  filterCategories(searchTerm: string) {
    if (this.form.controls['Categories'].value === '') return;
    this.categoryService.getAll(searchTerm).subscribe(result => {
      this.categoryList = [];
      const results = Array.isArray(result) ? Array.from(result) : [];
      if (results.length > 0) {
        for (let obj of results) this.categoryList.push(obj);
      }
    });
  }

  formatter = (cate: ICategory) => cate.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      map(term =>
        this.categoryList
          .filter(category => new RegExp(term, 'mi').test(category.name))
          .slice(0, 10)
      )
    );

  checkIfStringEmpty(): boolean {
    if (this.form.value.Categories === '' || this.form.value.Categories === null) {
      return true;
    }
    return false;
  }

  removeCategory(cat: any) {
    var index = this.names.indexOf(cat);
    this.names.splice(index, 1);
    this.categoryIds.splice(index, 1);
  }

  checkIfCategoryExists(): boolean {
    if (this.categoryList.filter(x => x.name == this.form.value.Categories).length > 0) {
      return true;
    }
    return false;
  }

  addAnotherCategory() {
    if (this.checkIfStringEmpty()) {
      this.toastr.error('You cannot add empty string', 'Error', {
        timeOut: 3000
      });
    } else if (this.names.length > 0 && this.names.includes(this.form.value.Categories.name)) {
      this.toastr.error('This category is already assigned to question', 'Error', {
        timeOut: 3000
      });
    } else if (this.checkIfCategoryExists()) {
      //true
      if (this.names.length > 0 && this.names.includes(this.form.value.Categories)) {
        this.toastr.error('This category is already assigned to question', 'Error', {
          timeOut: 3000
        });
      } else {
        var existingCategory = this.categoryList.filter(x => x.name == this.form.value.Categories);
        this.categoryIds.push(existingCategory[0].id);
        this.names.push(existingCategory[0].name);
      }
    } else {
      if (this.form.value.Categories.id == null) {
        this.newCategory = this.form.value.Categories;
        var nova = {
          name: this.newCategory
        };
        var nova2 = JSON.stringify(nova);
        this.categoryService.postCategory(nova2).subscribe(response => {
          this.newCategoryId = Number.parseInt(response.toString());
          this.toastr.success('Category successfully added to database', 'Success');
          this.categoryIds.push(this.newCategoryId);
          this.names.push(this.newCategory);
        });
      } else {
        this.names.push(this.form.value.Categories.name);
        this.categoryIds.push(this.form.value.Categories.id);
      }
    }
    this.form.controls['Categories'].reset();
  }
}
