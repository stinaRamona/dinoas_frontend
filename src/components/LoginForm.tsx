

function LoginForm() {
  return (
    <>
    <form>
        <label htmlFor="email">E-post</label><br />
        <input type="email" id="email" name="email" required /><br />

        <label htmlFor="password">Lösenord</label><br />
        <input type="text" id="password" name="password"/><br />

        <input type="submit" value="Logga in" /><br />
    </form>
    </>
  )
}

export default LoginForm
