import { Product } from './../models/product';
import { ProductService } from "../productService";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';
import { Observable } from 'rxjs';
import { WarningModalComponent } from '../shared/warning-modal/warning-modal.component';

@Component({
  selector: "app-consult-product",
  templateUrl: "./consult-product.component.html",
  styleUrls: ["./consult-product.component.css"]
})
export class ConsultProductComponent implements OnInit {
  product: any[];

  p: number = 1;
  count: number = 4;
  loader: boolean = false;
  formSearch: FormGroup;
  isValidDate: Boolean = true;
  bsModalRef: BsModalRef;
  messageError: string;
  typeErro: string;
  details: Boolean = false;
  products: Product;
  idProduto: number;
  nomeProduto: string;

  constructor(private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _http: HttpClient,
    private modalService: BsModalService) {

    this.initForm();
    this.reloadData();
  }


  ngOnInit() {
    this.initForm();
    this.reloadData();
  }

  initForm() {
    this.formSearch = this.formBuilder.group({
      nome: [''],
      categoria: [''],
      valor: ['']
    }, { updateOn: 'blur' });
  }

  onSubmit() {
      if (this.formSearch.get('nome').value === '' && this.formSearch.get('categoria').value === '' ) {

        this.messageError = "Favor Informar um filtro para pesquisa";
        this.typeErro = "danger";
        this.handleError(this.messageError, this.typeErro);
        this.reloadData();
      }  else { 
              this.loader = true;
              this.productService.getProduct(this.formSearch.get('nome').value, this.formSearch.get('categoria').value)
              .subscribe(data => {
                console.log(data)
                if (data != null) {
                  this.product = data;
                } else {this.reloadData();}
                
                this.loader = false;
              }, error => console.log(error));
        
      }
  }


  reloadData() {
   let getAll = "Busca por todos os itens"
    this.loader = true;
    this.productService.getAllProduct(getAll)
    .subscribe(data => {
      console.log(data)
      if (data != null) {
        this.product = data;
      } else {this.reloadData();}
      
      this.loader = false;
    }, error => console.log(error));
  }

  productDetails(id: number) {
   this.details = true;
    this.router.navigate(['details', id, this.details]);
  }

  productUpdate(id: number) {
    this.details = false;
     this.router.navigate(['details', id, this.details]);
   }

  changeValue(dado) {

    let nome = this.formSearch.get('nome').value;
    let categaria = this.formSearch.get('categaria').value;

    if (dado.srcElement.value != '') {

      if (dado.srcElement.id === "nome") {
        this.formSearch.get('categaria').disable();
        this.formSearch.controls['categaria'].setValue("");

      } else if (dado.srcElement.id === "categaria") { 
        this.formSearch.get('nome').disable();
        this.formSearch.controls['nome'].setValue("");

      }
    } else{

      this.formSearch.get('nome').enable();
      this.formSearch.get('categaria').enable();
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.idProduto)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  handleError(messageError: string, typeError: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = typeError;
    this.bsModalRef.content.message = messageError;
  }

  handleWarning(messageError: string, typeError: string) {
    this.bsModalRef = this.modalService.show(WarningModalComponent);
    this.bsModalRef.content.type = typeError;
    this.bsModalRef.content.message = messageError;
  }

  enviarModal(id, nome){
    this.idProduto = id;
    this.nomeProduto = nome;


  }

  sproductList = [
    {categoria: ""},
    {categoria: "Perecivel"},
    {categoria: "Nao Perecivel"}
  ]
}