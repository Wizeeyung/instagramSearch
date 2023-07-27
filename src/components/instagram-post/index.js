import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'
import './index.css'
import PostItems from '../postItems/index';
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'


const apiStatusConstants = {
  initial: 'initial',
  inProgress: 'inprogress',
  success: 'success',
  failure: 'failure'
}

class Instapost extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      allPosts: [],
      apiStatus: apiStatusConstants.initial,
      postResults: [],
      searchInput: ''
    }
  }
  
  componentDidMount(){
    this.getInstaPosts();
  }

  renderInstaPostLoaderView = ()=>{
    return (
    <div className='failure'>
      <Loader type='TailSpin' height='50' width='50' color='red' />

    </div>
    )

  }

  


  //button click function
  onTryAgain = () => {
    this.getInstaPosts()
  }



  renderInstaPostFailureView = ()=>{
    return (
    <div className='failure'>
      <img src='https://img.freepik.com/free-vector/page-found-with-people-connecting-plug-concept-illustration_114360-1927.jpg?w=2000' alt='failure'/>
      <p>Ooops something went wrong please try again</p>
      <button onClick={this.onTryAgain}>Try again</button>
      

    </div>
    )

  }

  renderInstaPostSuccessView = ()=>{
    const {postResults} = this.state
    console.log(postResults)
    return(
      <ul>
        {postResults.map((el)=> <PostItems key={el.id} username = {el.user}  profilePic = {el.userImageURL} largeImage = {el.largeImageURL} likes = {el.likes}/>)}
      </ul>
    )
    
  }


  renderInstaPostSwitch = ()=>{
    switch(this.state.apiStatus){
      case apiStatusConstants.success: return this.renderInstaPostSuccessView()
      case apiStatusConstants.inProgress: return this.renderInstaPostLoaderView()
      case apiStatusConstants.failure: return this.renderInstaPostFailureView()
      default: return null
    }
  }

  //lets fecth the api with getinstapost function
  getInstaPosts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress
    })

    const url = 'https://pixabay.com/api/?key=37174385-5b3a05820e1a9a74a0ee55daa&image_type=photo&pretty=true'
    const options = {
      method: 'GET'
    }
    const response = await fetch(url,options)

    if(response.ok){
      //request is successful
      const data = await response.json()
      this.setState({
        allPosts: data.hits,
        apiStatus: apiStatusConstants.success,
        postResults: data.hits

      })
      
      
    }else{
      //if request is unsuccesful
      this.setState({
        apiStatus: apiStatusConstants.failure
      })

    }
  } 

  onSearchInput = (e) =>{
    this.setState({
      searchInput: e.target.value
    })

  }


  onSearchButtonClick =()=>{
    const {searchInput, allPosts} = this.state;

    const filteredPost = allPosts.filter((el)=>{
      let user = el.user
      let searchedUser = searchInput.toLowerCase()
      user.includes(searchedUser)
      if(user.includes(searchedUser)){
        return true
      } else{
        return false
      }
    })
    this.setState({
      postResults: filteredPost
    })

  }

  render(){
    return(
      <div className='main-post'>
        <div className='input-container'>
          <input type='search' placeholder='Search User' value={this.state.searchInput} onChange={this.onSearchInput} onChangeCapture={this.onSearchButtonClick} onKeyPress={this.onSearchButtonClick} />
          <button onClick={this.onSearchButtonClick}><AiOutlineSearch /></button>
        </div>

        {
          //Here we want to check if the request is successful,
          //in progress or failure
        }
        <div>
        {this.renderInstaPostSwitch()}
        </div>

      </div>
    )
  }
}

export default Instapost;