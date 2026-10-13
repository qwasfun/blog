import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <p>© {new Date().getFullYear()} Qwas · 记录技术实践与日常思考</p>
        <nav aria-label="页脚导航">
          <a
            href="https://github.com/qwasfun/blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="/rss.xml">RSS 订阅</a>
          <Link href="/excalidraws">Excalidraw 画板</Link>
          <Link href="/changelog">更新记录</Link>
        </nav>
      </div>
    </footer>
  )
}
