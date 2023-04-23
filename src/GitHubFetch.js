import { useState, useEffect } from "react";

export default function GitHubFetch() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/FelloMan/repos")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setRepos(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const githubContainerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px"
    
  };

  const githubHeadingStyle = {
    fontSize: "2rem",
    marginBottom: "20px",
    textAlign: "center"
  };

  const githubListStyle = {
    listStyle: "none",
    margin: "0",
    padding: "0"
  };

  const githubListItemStyle = {
    marginBottom: "10px"
  };

  const githubLinkStyle = {
    color: "#0366d6",
    textDecoration: "none"
  };

  const githubLinkHoverStyle = {
    textDecoration: "underline"
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={githubContainerStyle}>
        <h1 style={githubHeadingStyle}>Github Repositories</h1>
        <ul style={githubListStyle}>
          {repos.map((repo) => (
            <li key={repo.id} style={githubListItemStyle}>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                style={githubLinkStyle}
                onMouseOver={(e) => e.target.style = githubLinkHoverStyle}
                onMouseOut={(e) => e.target.style = githubLinkStyle}
              >
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}