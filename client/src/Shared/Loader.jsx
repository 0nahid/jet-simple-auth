import { BallTriangle } from 'react-loader-spinner'

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center backdrop-blur-[9xl]">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#793ef9"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
    </div>
  )
}