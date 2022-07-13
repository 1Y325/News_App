import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


export class news extends Component {
  static defaultProps = {
    country :'in',
    pageSize:8,
    category: 'general'
    
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string,
  }
  
   capatilizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }


  constructor(props){
    super(props);
    console.log("hello");
    this.state={
        articles :[],
        loading: false,
        page:1

    }
    document.title = `${this.capatilizeFirstLetter(this.props.category)} - News`;
  }

async updateNews(){
  const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5ec20be8be04c31ade06507bab95973&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({articles: parsedData.articles , totalResults:parsedData.totalResults,
  loading:false})
}

  async componentDidMount(){
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5ec20be8be04c31ade06507bab95973&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({articles: parsedData.articles , totalResults:parsedData.totalResults,
    // loading:false})
    this.updateNews();
   }

   handlePrevClick = async ()=>{
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5ec20be8be04c31ade06507bab95973&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({page: this.state.page - 1});
    this.updateNews();
   }

 handleNextClick =   async ()=>{
  // if(  this.state.page  +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

  // }
  // else{
  //   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c5ec20be8be04c31ade06507bab95973&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading:true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   console.log(parsedData);
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading:false
  //   })
  // }
  this.setState({page: this.state.page + 1});
  this.updateNews();
   }

  render() {
    return (
      <div className='container my-3'> 
      <h1 className="text-center">News-Headlines</h1>
 
       <div className="row">
       {this.state.articles.map((element)=>{
         return  <div className="col-md-4"  key={element.url}>
         <NewsItem  title ={element.title?element.title.slice(0,40):""} description = {element.description?element.description.slice(0,88):""} imageurl={element.urlToImage} newsUrl={element.url} date ={element.publishedAt} />
       </div>
       })}
      
      </div>
      <div className="container d-flex justify-content-between">

      <button  disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>  &larr; Previous</button>
     
      <button  disabled={this.state.page  +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"  onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
      </div>
    ) 
  }
}

export default news
