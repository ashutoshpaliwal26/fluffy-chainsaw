import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
const GoogleAuthLogin = () => {
    const handleSuccess = () => {
        console.log("Successfully");
    }

    const handleError = () => {
        console.log("Error");
    }

     
    
  return (
    <GoogleOAuthProvider clientId="your_google_client_id">
      <div>
        <h2>Google Login</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </GoogleOAuthProvider>
  )
}

export default GoogleAuthLogin