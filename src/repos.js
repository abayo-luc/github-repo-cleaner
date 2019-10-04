import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const { GITHUB_USERNAME, GITHUB_TOKEN } = process.env;
export default class GitRepos {
  static async all(req, res) {
    try {
      const { page = 1, limit = 100 } = req.query;
      const { data } = await axios.get(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?page=${page}&per_page=${limit}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`
          }
        }
      );
      res.status(200).json({ message: "Success", data });
    } catch (error) {
      res.status(400).json({ message: "Action failed", errors: error.message });
    }
  }

  static async remove(req, res) {
    const { repos } = req.body;
    const config = {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    };
    axios
      .all(
        repos.map(repo =>
          axios.delete(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}`,
            config
          )
        )
      )
      .then(() => res.json({ message: "All repos were remove successuflly" }))
      .catch(error => {
        res.status(400).json({
          message: "Sorry an error occured, try again",
          error: error.message
        });
      });
  }
}
