import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import cuid from 'cuid';
import { Grid, Header, Button } from 'semantic-ui-react';
import { getFileExtension } from '../../../app/common/util/util';
import { updateScreamPhoto } from '../../../app/firestore/firestoreServices/firestoreScreamsHandler';
import { uploadImage } from '../../../app/firestore/firebaseServices/firebaseScreamsHandler';
import { getImgUrl } from './../screamActions';
import PhotoWidgetCropper from '../../../app/common/photos/PhotoWidgetCropper';
import PhotoWidgetDropzone from '../../../app/common/photos/PhotoWidgetDropzone';
import { useMediaQuery } from 'react-responsive';

export default function ScreamImageUpload({ screamId, newScream, dispatch }) {
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlList, setImgUrlList] = useState([]);
  // console.log('My screamId', screamId);
  useEffect(() => {
    dispatch(getImgUrl(imgUrlList && imgUrlList));
  }, [dispatch, imgUrlList]);
  //  console.log({imgUrl})
  // console.log({ imgUrlList });

  function handleUploadImage() {
    setLoading(true);
    const filename = cuid() + '.' + getFileExtension(files[0].name);
    const uploadTask = uploadImage(image, filename);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        toast.error(error.messege);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImgUrl(downloadURL);
          setImgUrlList([...imgUrlList, downloadURL]);
          updateScreamPhoto(downloadURL, filename, screamId)
            .then((doc) => {
              console.log({ doc });
              setLoading(false);
              handleCancelCrop();
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop() {
    setFiles([]);
    setImage(null);
  }
  console.log({ files });
  return (
    <>
      <Grid>
        <Grid.Column width={isPortrait ? 16 : 4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        {isPortrait ? null : <Grid.Column width={1} />}
        <Grid.Column width={isPortrait ? 16 : 4}>
          <Header color='teal' sub content='Step 2 - Resize' />
          {files.length > 0 && (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        {isPortrait ? null : <Grid.Column width={1} />}
        <Grid.Column width={isPortrait ? 16 : 4}>
          <Header color='teal' sub content='Step 3 - Preview & upload' />
          {files.length > 0 && (
            <>
              <div
                className='img-preview'
                style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
                // style={{ width: '100%', overflow: 'hidden' }}
              />
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={() => {
                    handleUploadImage();
                    handleCancelCrop();
                  }}
                  style={{ width: 100 }}
                  positive
                  icon='check'
                />
                <Button
                  disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: 100 }}
                  icon='close'
                />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}
