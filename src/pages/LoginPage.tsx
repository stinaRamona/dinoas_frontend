import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <main style={{maxWidth: "800px", width: "100%",margin: "0 auto", marginBottom: "5%"}}>
        <h1>Logga in för att administrera sidan</h1>

        <LoginForm />
      </main>

    </div>
  )
}

export default LoginPage
