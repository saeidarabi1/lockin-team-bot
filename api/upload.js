const GITHUB_OWNER = "saeidarabi1";
const GITHUB_REPO = "lockin-team-bot";
const GITHUB_BRANCH = "master";
const KNOWLEDGE_PATH = "knowledge";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { filename, content, password } = req.body || {};

  // Auth
  if (!password || password !== process.env.TEAM_PASSWORD) {
    return res.status(401).json({ error: "Wrong password" });
  }

  // Validate
  if (!filename || typeof filename !== "string") {
    return res.status(400).json({ error: "Missing filename" });
  }
  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "Missing content" });
  }

  // Only allow safe filenames, .md and .txt extensions
  const safeName = filename
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/\.{2,}/g, ".")
    .toLowerCase();

  if (!safeName.endsWith(".md") && !safeName.endsWith(".txt")) {
    return res.status(400).json({ error: "Only .md and .txt files allowed" });
  }

  if (safeName === "readme.md") {
    return res.status(400).json({ error: "Cannot overwrite README.md" });
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return res.status(500).json({ error: "GitHub token not configured" });
  }

  const filePath = `${KNOWLEDGE_PATH}/${safeName}`;
  const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;

  try {
    // Check if file already exists (need SHA to update)
    let sha = undefined;
    const existing = await fetch(apiUrl, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    });
    if (existing.ok) {
      const existingData = await existing.json();
      sha = existingData.sha;
    }

    // Upload to GitHub
    const body = {
      message: sha
        ? `docs: update knowledge doc ${safeName}`
        : `docs: add knowledge doc ${safeName}`,
      content, // already base64 from client
      branch: GITHUB_BRANCH,
    };
    if (sha) body.sha = sha;

    const uploadRes = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.error("GitHub upload error:", err);
      return res.status(502).json({ error: "GitHub upload failed" });
    }

    return res.status(200).json({
      success: true,
      filename: safeName,
      updated: !!sha,
    });
  } catch (err) {
    console.error("Upload handler error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
