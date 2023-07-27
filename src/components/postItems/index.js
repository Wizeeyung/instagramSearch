import React from 'react'
import './index.css'
// import React from 'react-icons'
import {AiOutlineHeart} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {AiOutlineShareAlt} from 'react-icons/ai'
import {FcLike} from 'react-icons/fc'



//receive post as props
class PostItems extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      isLiked: false,
      count: props.likes
    }
  }


  addOne = ()=>{
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  

  render(){

    
    const {isLiked} = this.state
    const {username, profilePic, largeImage, likes} = this.props
    return(
      <li className='postcontainer'>
        <div className='profile-name'>
          <img src={profilePic} alt='profile-pic' />
          <p>{username}</p>
        </div>
        <img src={largeImage} alt='main-pic'/>
        <div className='icons'>
          <button onClick={this.addOne}>{isLiked ? <FcLike className='icon'/> : <AiOutlineHeart className='icon' />}</button>
          <button><FaRegComment className='icon' /></button>
          <button><AiOutlineShareAlt className='icon' /></button>
        </div>
        <p className='likes'>{isLiked ? likes + 1: likes} likes</p>
  
      </li>
    )
  }
}

export default PostItems