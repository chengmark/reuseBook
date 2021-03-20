import React, { ReactElement, useState } from 'react'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import {
  Btn,
  BtnRow,
  CoverPhoto,
  CoverPhotoWrapper,
  PreviewArea,
  UploadArea,
  UploadButton,
  UploadIcon,
  UploadText,
} from '../style'
import ImageIcon from '@material-ui/icons/Image'

type Props = {
  children?: ReactElement
  goStep2: (image: { dataURL: string; file: File }) => void
}

const UploadForm = (props: Props): ReactElement => {
  const { children, goStep2, ...rest } = props
  const [images, setImages] = useState([{ dataURL: '', file: new File([''], '') }]) // images[0] is the shape of this state
  const maxNumber = 2

  const handleUploadingChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log(imageList, addUpdateIndex)
    setImages(imageList as never[])
  }

  return (
    <ImageUploading multiple value={images} onChange={handleUploadingChange} maxNumber={maxNumber}>
      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
        // write your building UI
        <>
          {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
          {/* {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.dataURL} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <button onClick={() => onImageUpdate(index)}>Update</button>
                <button onClick={() => onImageRemove(index)}>Remove</button>
              </div>
            </div>
          ))} */}
          {imageList.length < 2 ? (
            <UploadArea {...dragProps}>
              <UploadText isTitle>Upload a photo</UploadText>
              <UploadIcon />
              <UploadButton onClick={onImageUpload}>Click here</UploadButton>
              <UploadText>or drag here</UploadText>
              <UploadText>( maximum 1 photo )</UploadText>
            </UploadArea>
          ) : (
            <PreviewArea>
              <CoverPhotoWrapper>
                Cover Photo
                <CoverPhoto>
                  <img src={images[1]?.dataURL} width="100%" />
                </CoverPhoto>
              </CoverPhotoWrapper>
              <BtnRow>
                <Btn
                  onClick={() => {
                    onImageUpdate(1)
                  }}
                >
                  Change Photo
                </Btn>
                <Btn
                  onClick={() => {
                    goStep2(images[1])
                  }}
                >
                  Next Step
                </Btn>
              </BtnRow>
            </PreviewArea>
          )}
        </>
      )}
    </ImageUploading>
  )
}

export default UploadForm
