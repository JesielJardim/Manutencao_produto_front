import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../productService';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  formSearch: FormGroup;
  loaderDetails: boolean = false;
  details: boolean = false;
  update: boolean = false;
  product: Product;
  messageError: string;
  typeErro: string;
  bsModalRef: BsModalRef;
  IdProduct: number;
  error: boolean = false;
  errorValue: boolean = false;

  constructor(private route: ActivatedRoute,private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService) { this.initForm(); }

  ngOnInit() {
    this.initForm();
     this.id = this.route.snapshot.params['id'];
     if(this.route.snapshot.params['details'] === 'true') { 
      this.details =this.route.snapshot.params['details'];
      this.formSearch.get('nome').disable();
      this.formSearch.get('categoria').disable();
      this.formSearch.get('valor').disable();

     } else {
       this.update = true;
       this.formSearch.get('nome').disable();
     }
     this.loaderDetails = true;
     this.productService.getProductById(this.id)
       .subscribe(data => {
         console.log(data)
         this.product = data;
         this.loaderDetails = false;
         this.populaDadosForm(data);
       }, error => console.log(error)); 
  }

  populaDadosForm(dados) {

    this.formSearch.patchValue({

        nome: dados.nome,
        categoria: dados.categoria,
        valor: dados.valor
        
    });
  }

  cancelar() {
    this.list();
  }

  onSubmit() {
    this.updateProduct();    
  }

  initForm() {
    this.formSearch = this.formBuilder.group({
      nome: ['', Validators.required],
      categoria: [''],
      valor: ['', Validators.required]
    }, { updateOn: 'blur' });
  }

  updateProduct() {

    if (this.formSearch.get('nome').value === '' || this.formSearch.get('valor').value === '' ) {
    
      this.messageError = "Nome e Valor do produto é obrigatório";
      this.typeErro = "danger";
      this.handleError(this.messageError, this.typeErro);
      this.error = true;
      this.errorValue = true;


    }else{
      this.error = false;
      this.errorValue = false;
      this.productService.updateProduct(this.id, this.product)
      .subscribe(data => console.log(data), error => console.log(error));
       this.product = new Product();
       this.list();

    }
  }

  list(){
    this.router.navigate(['products']);
  }

  changeValue(dado) {

    if (dado.srcElement.value != '') {

      if (dado.srcElement.id === "nome") {
        this.error = true;
      } else if (dado.srcElement.id === "valor") { 

        if(this.formSearch.get('valor').value === ''){
          this.messageError = "Valor do produto é obrigatório";
          this.typeErro = "danger";
          this.handleError(this.messageError, this.typeErro);
        }


      }
    } else {      
      this.error = false;
      this.errorValue = false;}
  }

  handleError(messageError: string, typeError: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = typeError;
    this.bsModalRef.content.message = messageError;
  }

  sproductList = [
    {categoria: ""},
    {categoria: "Perecivel"},
    {categoria: "Nao Perecivel"}
  ]
}
