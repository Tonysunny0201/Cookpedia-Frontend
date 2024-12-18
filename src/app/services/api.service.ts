import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeModel } from '../admin/model/recipeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // server_url = "http://localhost:3000"
  server_url = "https://cookpedia-server.onrender.com"

  constructor(private http:HttpClient) { }

  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }

  // add-testimony
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`,reqBody)
  }

  // register 
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`,reqBody)

  }

  // login
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
  }


  // appendToken in req header 
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  // view recipe  : recipe/:id/view
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`,this.appendToken())
  }

  // related-recipes?cuisine=Italian
  relatedRecipesAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`,this.appendToken())
  }

  // recipe/674ecf493b43db7308e04ca0/download
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`,reqBody,this.appendToken())
  }

  // recipe/674ecf493b43db7308e04ca0/save
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`,reqBody,this.appendToken())
  }


  // get-save-recipes
  getUserSaveRecipesAPI(){
    return this.http.get(`${this.server_url}/get-save-recipes`,this.appendToken())
  }

  // get-save-recipes
  deleteSaveRecipesAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`,this.appendToken())
  }

  // get-save-recipes
  getUserDownloadRecipeAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

  // user-edit
  editUserAPI(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`,reqBody,this.appendToken())
  }

  // all-users
  allUsersAPI(){
    return this.http.get(`${this.server_url}/all-users`,this.appendToken())
  }

  // download-list
  allDownloadListAPI(){
    return this.http.get(`${this.server_url}/download-list`,this.appendToken())
  }

  // all-feedback
  getallFeedbackListAPI(){
    return this.http.get(`${this.server_url}/all-feedback`,this.appendToken())
  }

  // feedback/67502888d16e67b0d742cd26/update?status=Approved
  updateFeedbackStatusAPI(feedBackId:string,status:string){
    return this.http.get(`${this.server_url}/feedback/${feedBackId}/update?status=${status}`,this.appendToken())
  }

  // all-approved-feedback
  getallApprovedFeedbackAPI(){
    return this.http.get(`${this.server_url}/all-approved-feedback`)
  }

  // add-recipe
  addRecipeAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-recipe`,reqBody,this.appendToken())
  }

  // recipe/675bf2d6fe4b3608fdde11b8/edit
  updateRecipeAPI(id:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipe/${id}/edit`,reqBody,this.appendToken())
  }

  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipe/${id}/remove`,this.appendToken())
  }


  // getChartData
  getChartData(){
    this.allDownloadListAPI().subscribe((res:any)=>{
      console.log(res);
      let downloadArrayList:any=[]
      let output:any={}
      res.forEach((item:any)=>{
      // item = {recipeCuisine: "Italian",cout:3}
        let cuisine = item.recipeCuisine // cuisine = Italian
        let currentCount = item.count // currentCount = 3
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount // output = {Italian:3}
        }
      })
      console.log(output);
      for(let cuisine in output){
        downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
      // code extracting cuisine and its total download count as object and added to an array
      // input : [ {recipeCuisine,count} ]
      // output : [ {name:cuisine,y:totalcount} ]
      // algorithm
      // 1. create an empty array for output, object for storing each array item
      // 2. get each array item of res and store its recipeCuisine & count to a variable
      // 3. check recipeCuisine is vaialable in output object, if present then set the value of recipeCuisine key as total existing recipeCuisine value with new count , not present then insert recipeCuisine as key and value as its count 
      // 4. push each key from output object into output array

    })
  }
  
}
