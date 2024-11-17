import React from 'react';
import ImagePopup from './ImagePopup'; 

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      selectedImage: '',
      downloadUrl: '', 
      id: '', 
      alt_description: '', 
      likes: '', 
      updated_at: '',
      avataar: '',
      user_name: '',
      location: '',
    };
  }

  openPopup = (imageSrc, downloadUrl, id, alt_description, likes, updated_at, avataar, user_name, location) => {
    this.setState({
      showPopup: true,
      selectedImage: imageSrc,
      downloadUrl: downloadUrl,
      id: id,
      alt_description: alt_description,
      likes: likes,
      updated_at: updated_at,
      avataar: avataar,
      user_name: user_name,
      location: location,
    });
  };

  closePopup = () => {
    this.setState({
        showPopup: false,
        selectedImage: '',
        downloadUrl: '',
        id: '',
        alt_description: '',
        likes: '',
        updated_at: '',
        avataar: '',
        user_name: '',
        location: '',
    });
  };

  render() {
    const { src } = this.props;
    // console.log("propes are:", src)
    return (
      <div>
        <img
          src={src}
          alt=""
          style={{ width: '422px', height: '300px', cursor:'pointer', margin: '-5px 2px -8px 0px'}}
          onClick={() => this.openPopup(src, this.props.downloadUrl, this.props.id, this.props.alt_description, this.props.likes, this.props.updated_at, this.props.avataar, this.props.user_name, this.props.location)} // Pass downloadUrl
        />

        <ImagePopup
          show={this.state.showPopup}
          imageUrl={this.state.selectedImage}
          downloadUrl={this.state.downloadUrl}
          id={this.state.id} 
          alt_description={this.state.alt_description}
          likes = {this.state.likes}
          updated_at={this.state.updated_at}
          avataar={this.state.avataar}
          user_name={this.state.user_name}
          location={this.state.location}
          onClose={this.closePopup}
        />
      </div>
    );
  }
}

export default Image;