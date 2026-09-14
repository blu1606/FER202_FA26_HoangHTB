function About({ user }) {
    return (
        <div>
            <h1>About Page</h1>
            <p>My name is {user.name}</p>
            <p>My username is {user.email}</p>
        </div>
    )
}

export default About;