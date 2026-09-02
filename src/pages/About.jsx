import './About.css'

const team = [
  {
    id: 'ceo',
    name: 'Sarah Jenkins',
    role: 'Chief Executive Officer',
    dept: 'Strategy & Vision',
    bio: 'Former McKinsey partner turned tech visionary. Sarah drives the strategic alignment of our consulting practice, ensuring every technological implementation maps directly to quantifiable business outcomes and enterprise-scale growth.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaH_eFxZwB2RpFFn_zfJ8aLilfObPxAS7Sxq-kTwI-5vrgIJfSdEU6PPJZfhfU4M0S0cFO9lh5w6MRw4i3uOTUzGQavQqySmugZ1y422JvYHfK9xEeWufuYDzyqm1nJxmRHNx1aKdUx8vLAdAeTzALfww3uppKDao6zCnWTdHsfE-msW0zBqFdZlP0qp0twLIjxp8Gh8nxbUo6oRaIB5fRygr-xbeZV7-UxCOgudEuYQ08VVWkgaueCA',
    size: 'feature',
  },
  {
    id: 'ai',
    name: 'Dr. Chen Wei',
    role: 'Head of AI',
    dept: 'Intelligence',
    bio: 'Pioneering applied machine learning architectures. Dr. Wei translates complex neural network theory into production-ready intelligence solutions.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADxUh6P_tAnV2wYxMzG1rXCn6T3t21URU6NtAwVTR8A-G6g8dep1RatDkgW5QOYyxb6QBTYn8Zo67SSfVx8BcXokdyUQ2ItrcvEWjCbFjzXRS-EgL_PIVlCJ6fOghvYV-9WscJKlZRe8H4gPY-kMJ2TSDsEvmIUXhE1WADgkGYW3QTsA5fG8ZtMZ9WfuW1WZVOLbr3thYfDFLX7Wo9i5JccMoCKRXePXcXk28x0tjJ5s9aPsFS_9es8w',
    size: 'small',
  },
  {
    id: 'cto',
    name: 'Marcus Thorne',
    role: 'Chief Technology Officer',
    dept: 'Infrastructure',
    bio: 'The architect behind Lumina Logic\'s scalable cloud methodologies. Marcus brings two decades of experience building fault-tolerant, globally distributed systems for Fortune 500 financial institutions, bringing rigorous stability to our innovative edge.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUC7NvWyOKsbbLd3rdbMqUuz_oAlJ4QvGhjTPbnvE_NgKJgK1IlsVuZsx1LXM99-NBiFjTbztLWArU3XXmhVHbH1wlTkkvh2ze5t4gG6J7k09TjIEp687MdgTTAd-5grQTXZN-SP2H93DfMu01s3eP8XNzr3nietKk7k23X9wYqpi6QpYUe4mhcGEgL0_Gn2zqrthJ7xjTdH6W3xgSe4SfqbEfuvCA7dKKuhKBZfcz6Mbq2RkKmVNouQ',
    size: 'wide',
  },
]

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero container">
        <div className="about-hero-glow" aria-hidden="true" />
        <div className="about-hero-content" data-reveal>
          <span className="hero-badge text-label-sm">Our Philosophy</span>
          <h1 className="about-headline">
            Innovation Driven <br />
            <span className="text-gradient-br">by Logic.</span>
          </h1>
          <p className="text-body-lg about-subtext">
            We bridge the gap between abstract strategic vision and concrete technical implementation.
            At Lumina Logic, we architect high-performance digital ecosystems for forward-thinking enterprises.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="team-section container">
        <div className="team-header">
          <h2 className="team-title">The Architects</h2>
          <p className="text-body-lg team-subtitle">Precision engineering meets executive strategy.</p>
        </div>

        <div className="team-grid">
          {/* CEO – feature card */}
          <div className="team-card team-card--feature glass-panel linear-glow-border" data-reveal data-delay="1">
            <div className="team-card-img-wrapper team-card-img-wrapper--feature">
              <img
                src={team[0].avatar}
                alt={team[0].name}
                className="team-card-img"
              />
            </div>
            <div className="team-card-body">
              <span className="team-dept text-label-md">{team[0].dept}</span>
              <h3 className="text-headline-md team-name">{team[0].name}</h3>
              <p className="text-body-md team-role">{team[0].role}</p>
              <p className="text-body-md team-bio">{team[0].bio}</p>
            </div>
          </div>

          {/* AI Head – small card */}
          <div className="team-card team-card--small glass-panel linear-glow-border" data-reveal data-delay="2">
            <div className="team-card-img-wrapper team-card-img-wrapper--square">
              <img
                src={team[1].avatar}
                alt={team[1].name}
                className="team-card-img"
              />
            </div>
            <span className="team-dept text-label-md">{team[1].dept}</span>
            <h3 className="text-headline-md team-name">{team[1].name}</h3>
            <p className="text-body-md team-role">{team[1].role}</p>
            <p className="text-body-md team-bio">{team[1].bio}</p>
          </div>

          {/* CTO – wide card */}
          <div className="team-card team-card--wide glass-panel linear-glow-border" data-reveal data-delay="3">
            <div className="team-card-img-wrapper team-card-img-wrapper--wide">
              <img
                src={team[2].avatar}
                alt={team[2].name}
                className="team-card-img"
              />
            </div>
            <div className="team-card-body">
              <span className="team-dept text-label-md">{team[2].dept}</span>
              <h3 className="text-headline-md team-name">{team[2].name}</h3>
              <p className="text-body-md team-role">{team[2].role}</p>
              <p className="text-body-md team-bio">{team[2].bio}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
