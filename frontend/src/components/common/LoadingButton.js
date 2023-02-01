import loading from "../../images/loading2.gif"

const LoadingButton = () => {
  return (
    <button className="loadingButton">
        <img src={loading} alt="loading" />
    </button>
  )
}

export default LoadingButton