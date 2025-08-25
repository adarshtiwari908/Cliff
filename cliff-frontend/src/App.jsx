import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Profile from "./pages/profile";
import heroBg from "./assets/hero-bg.webp";
import Docs from "./pages/docs";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar - Dark Theme */}
      <nav className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center">
              <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#fff" />
                <path
                  d="M12 6c3.314 0 6 2.686 6 6s-2.686 
                    6-6 6-6-2.686-6-6 2.686-6 6-6z"
                  fill="#000"
                />
              </svg>
              <span className="text-2xl font-semibold tracking-tight text-white">
                cliff
              </span>
            </NavLink>

            {/* Links */}
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-6">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-medium"
                      : "text-gray-300 hover:text-white transition-colors font-medium"
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-medium"
                      : "text-gray-300 hover:text-white transition-colors font-medium"
                  }
                >
                  Signup
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-medium"
                      : "text-gray-300 hover:text-white transition-colors font-medium"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/docs"
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Docs
                </NavLink>
              </div>

              <div>
                <NavLink
                  to="/login"
                  className="px-6 py-2 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
                >
                  Login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
      <Copyright />
    </BrowserRouter>
  );
}

// Landing Page
function Landing() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-24">
            {/* Text Left */}
            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light mb-6 leading-tight">
                Redefining What Auth Can Be.
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed">
                Forget patchwork logins and clunky integrations. Cliff gives founders the freedom 
                to scale effortlessly—from your first spark of an idea to a global user base.  
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <NavLink
                  to="/signup"
                  className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
                >
                  Start free trial
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                >
                  Login
                </NavLink>
              </div>
            </div>

            {/* Image Right */}
            <div className="flex justify-center lg:justify-end">
              <img
                src={heroBg}
                alt="Hero Graphic"
                className="w-80 h-80 lg:w-[450px] lg:h-[450px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* NEW cliff Section */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
          <div className="bg-gradient-to-br from-gray-900 to-purple-900 p-10 rounded-2xl shadow-lg">
            <p className="text-sm text-purple-400 mb-3">DEVELOPER PREVIEW</p>
            <h3 className="text-2xl font-semibold mb-4">
              Identity for <span className="text-purple-400">AI-Driven Businesses</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Build and secure GenAI applications with enterprise-grade authentication. 
              Cliff gives your teams the confidence to innovate — while ensuring compliance 
              and security at scale.
            </p>
            <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200">
              Get started
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-purple-900 p-10 rounded-2xl shadow-lg">
            <p className="text-sm text-purple-400 mb-3">REGISTRATION IS OPEN</p>
            <h3 className="text-2xl font-semibold mb-4">Cliff-aire</h3>
            <p className="text-gray-300 mb-6">
              Join global leaders this September to explore how Cliff is shaping the future 
              of identity and trust in the AI economy.
            </p>
            <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200">
              Get more details
            </button>
          </div>
        </div>
      </div>

      {/* Platform Section */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-6">
            Built for Scale. Trusted by Leaders.
          </h2>
          <p className="text-lg sm:text-xl text-gray-400">
            Cliff integrates seamlessly with your existing stack, adapts as your 
            business evolves, and keeps your customers secure every step of the way.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <Stat number="8,400+" label="Enterprises">
            Rely on Cliff to protect their users and infrastructure worldwide.
            </Stat>
            <Stat number="7,000+" label="Integrations">
              Connect Cliff with the tools your business already runs on.
            </Stat>
            <Stat number="95%" label="CEO Approval">
              Leaders recommend Cliff for enabling growth with security.
            </Stat>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-black py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Feature
            title="Single Sign-On"
            description="One identity, endless access. Simplify user experience while improving security."
          />
          <Feature
            title="Lifecycle Management"
            description="Automate employee and customer identity flows — reducing risk and saving time."
          />
          <Feature
            title="Adaptive MFA"
            description="Stronger protection, smarter access. Security that adjusts to risk in real time."
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light mb-6">
            Secure your future with <b>Cliff</b>.
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8">
            Join thousands of organizations using Cliff to protect their AI-driven growth. 
            Fast to deploy. Trusted by enterprises. Loved by developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/signup"
              className="px-8 py-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors"
            >
              Start free trial
            </NavLink>
            <NavLink
              to="/login"
              className="px-8 py-4 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// Small Components
function Stat({ number, label, children }) {
  return (
    <div>
      <div className="text-5xl font-bold text-white mb-4">{number}</div>
      <div className="text-xl text-gray-300">{label}</div>
      <p className="text-gray-400 mt-2">{children}</p>
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="p-8 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center mb-6">
        <svg
          className="w-6 h-6 text-purple-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 
               6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 
               1 1 0 102 0 4 4 0 00-4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

// Copyright notice
const Copyright = () => (
  <div className="text-center text-gray-500 text-sm py-4">
    © 2025 Cliff, Inc. All Rights Reserved.
  </div>
);

export default App;
