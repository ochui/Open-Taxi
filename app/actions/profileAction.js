import { Constants, ImagePicker, Permissions } from "expo";


export function uploadImage (pickerResult) => {
    let uploadResponse, uploadResult;

    try {

      if (!pickerResult.cancelled) {
        uploadImageAsync(pickerResult.uri).then(res => {
            
        })

        this.setState({
          image: uploadResult.location
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}
