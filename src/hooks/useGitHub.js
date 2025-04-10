import { useState, useCallback } from 'react';

export const useGitHub = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchGitHubData = useCallback(async (username) => {
    if (!username) {
      throw new Error('Please enter a GitHub username');
    }

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        if (userResponse.status === 404) {
          throw new Error('GitHub user not found');
        }
        throw new Error('Failed to fetch GitHub profile');
      }
      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
      if (!reposResponse.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const reposData = await reposResponse.json();

      // Process repositories data
      const processedRepos = reposData.map(repo => ({
        name: repo.name,
        description: repo.description || 'No description available',
        url: repo.html_url,
        stars: repo.stargazers_count,
        languages: [
          { name: repo.language || 'Other', color: getLanguageColor(repo.language) }
        ]
      }));

      // Format data
      const formattedData = {
        user: {
          name: userData.name || userData.login,
          bio: userData.bio || 'No bio available',
          avatarUrl: userData.avatar_url,
          url: userData.html_url,
          contributionsCollection: {
            totalCommitContributions: userData.public_repos,
            totalPullRequestContributions: userData.public_gists,
            totalRepositoryContributions: userData.public_repos
          },
          repositories: {
            nodes: processedRepos
          }
        }
      };

      setData(formattedData);
      return formattedData;
    } catch (error) {
      console.error('GitHub API Error:', error);
      throw new Error(error.message || 'Failed to fetch GitHub data');
    }
  }, []);

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      HTML: '#e34c26',
      CSS: '#563d7c',
      PHP: '#4F5D95',
      Ruby: '#701516',
      'C++': '#f34b7d',
      C: '#555555',
      Go: '#00ADD8',
      Rust: '#dea584',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Dart: '#00B4AB',
      Vue: '#41b883',
      React: '#61dafb',
      Angular: '#dd1b16',
      Other: '#8257e5'
    };
    return colors[language] || colors.Other;
  };

  const generatePortfolio = useCallback((data) => {
    if (!data?.user) return null;

    return {
      profile: {
        name: data.user.name,
        bio: data.user.bio,
        avatar: data.user.avatarUrl,
        githubUrl: data.user.url,
      },
      stats: {
        commits: data.user.contributionsCollection.totalCommitContributions,
        pullRequests: data.user.contributionsCollection.totalPullRequestContributions,
        repositories: data.user.contributionsCollection.totalRepositoryContributions,
      },
      projects: data.user.repositories.nodes,
    };
  }, []);

  return {
    loading,
    error,
    data,
    fetchGitHubData,
    generatePortfolio,
  };
}; 