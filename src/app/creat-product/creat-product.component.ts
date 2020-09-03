import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../productService';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-creat-product',
  templateUrl: './creat-product.component.html',
  styleUrls: ['./creat-product.component.css']
})
export class CreatProductComponent implements OnInit {

  product: Product=  new Product();
  submitted = false;
  formSearch: FormGroup;
  messageError: string;
  typeErro: string;
  bsModalRef: BsModalRef;
  error: boolean = false;
  errorValue: boolean = false;
  valorProduto: string;
  nomeProduto: string;

  constructor(private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: BsModalService) { 
       this.initForm();
    }

  ngOnInit() {
     this.initForm();
  }


  save() {

    if((this.nomeProduto === '' || this.nomeProduto === undefined) || (this.valorProduto === '' || this.valorProduto === undefined)){

             this.messageError = "Nome e Valor do produto é obrigatório";
             this.typeErro = "danger";
             this.handleError(this.messageError, this.typeErro);
             this.error = true;
             this.errorValue = true;

    }else {
      
            this.productService.createProdutct(this.product)
           .subscribe(data => console.log(data), error => console.log(error));
            this.product = new Product();
            this.list();
  
  
  }
  }

  initForm() {
    this.formSearch = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: [''],
      valor: ['', Validators.required]
    }, { updateOn: 'blur' });
  }

  onSubmit() {

    this.submitted = true;
    this.save();    
  }

  list(){
    this.router.navigate(['products']);
  }

  listProd = [
    {categoria: ""},
    {categoria: "Perecivel"},
    {categoria: "Nao Perecivel"}
  ]

  cancelar() {

    this.list();
  }

  teste(value, nome){

    this.valorProduto= value;
    this.nomeProduto = nome;

  }

  handleError(messageError: string, typeError: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = typeError;
    this.bsModalRef.content.message = messageError;
  }
}
