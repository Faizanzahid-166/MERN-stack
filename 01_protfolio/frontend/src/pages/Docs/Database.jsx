import {databasePosts} from '../../data/learnDocs/databasePosts.js'

export default function Database() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">🗄️ Database Articles</h2>
      <div className="space-y-6">
        {databasePosts.map((post, i) => (
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
