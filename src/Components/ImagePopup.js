import React from 'react';
import './image-popup.css';
import download from './Assests/download3.jpg'
import close from './Assests/close.jpeg'
import avataar from './Assests/avataar.png'

class ImagePopup extends React.Component {



    handleDownload = (downloadUrl) => {
    const {id} =this.props;
    if (downloadUrl) {
        
      const link = document.createElement('a');
      link.href = `https://unsplash.com/photos/${id}/download?ixid=M3w1MTM5MzF8MHwxfHNlYXJjaHwyfHx1bmRlZmluZWR8ZW58MHx8fHwxNjk3NjI0NTUwfDA&force=true`;
      link.download = 'downloaded_image.jpg';
      link.click();
    } else {
      alert('Download is not available for this image.');
    }
  };




  render() {
    const { show, imageUrl, onClose } = this.props;
    const { downloadUrl } = this.props;
    const updatedTimestamp = this.props.updated_at;
    const spaceSeparatedTime = updatedTimestamp.replace('T', ' ').replace('Z', '');
    // const { alt_description } = this.props;
    console.log("inside imag epopup",this.props)
    return (
        
      <div className={`image-popup ${show ? 'active' : ''}`}>
            <div className="popup-content">
            <div className="user-info-container">
                <img src ={avataar} className="avataar"/>
                <div className='user-location'>
                    <span className="name_user"> {this.props.user_name}</span>
                    <span className="location"> {this.props.location}</span>
                </div>
                <img src={close} className="close-button" onClick={onClose} />
            </div>
          <img src={imageUrl} alt="Enlarged Image" style={{ width: '410px', height: '300px' }}/>
          <img src={download} onClick={() => this.handleDownload(downloadUrl)} className='download-button' alt="Download" />
          <span className="desc"> "{this.props.alt_description}" </span>
          <span className="like"><strong>Likes:</strong> {this.props.likes}</span>
          <span className="upload"><strong>Uploaded On: </strong>{spaceSeparatedTime}</span>
          
          
        </div>
      </div>
      
    );
    console.log(this.props.user)
  }
  
}

export default ImagePopup;