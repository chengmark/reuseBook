import React, { ReactElement } from 'react'
import { SkeletonImage, SkeletonImageWrapper, SkeletonInfoSection, SkeletonText, SkeletonWrapper } from './style'

const ProductSkeleton = (): ReactElement => {
  return (
    <SkeletonWrapper>
      {/* <SkeletonImage animation="wave" width={250} height={155} /> */}
      <SkeletonImageWrapper>
        <SkeletonImage animation="wave" />
      </SkeletonImageWrapper>
      <SkeletonInfoSection>
        <SkeletonText animation="wave" height={15} width={`90%`} />
        <SkeletonText animation="wave" height={15} width={`80%`} />
      </SkeletonInfoSection>
    </SkeletonWrapper>
  )
}

export default ProductSkeleton
