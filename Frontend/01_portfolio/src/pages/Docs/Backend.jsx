import {backendPosts} from '../../data/learnDocs/backendposts.js'

export default function Backend() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">⚡ Backend Articles</h2>
      <div className="space-y-6">
        {backendPosts.map((post, i) => (
          <a
            key={i}
            href={post.link}
            target="_blank"
            rel="noreferrer"
            className="block p-5 bg-gray-700 rounded-xl hover:bg-gray-700 transition"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-400">{post.description}</p>
            <span className="text-blue-400">Read More →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
