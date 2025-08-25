import React, { useState } from 'react';
import { ChevronRight, Copy, Check, Book, Code, Shield, Zap, Globe, Users } from 'lucide-react';

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [copiedCode, setCopiedCode] = useState('');

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const navigationItems = [
    { id: 'getting-started', title: 'Getting Started', icon: Book },
    { id: 'authentication', title: 'Authentication', icon: Shield },
    { id: 'sso', title: 'Single Sign-On', icon: Users },
    { id: 'api-reference', title: 'API Reference', icon: Code },
    { id: 'integrations', title: 'Integrations', icon: Globe },
    { id: 'security', title: 'Security', icon: Shield }
  ];

  const codeExamples = {
    install: `npm install @cliff/sdk
# or
yarn add @cliff/sdk`,
    
    init: `import { CliffAuth } from '@cliff/sdk';

const cliff = new CliffAuth({
  domain: 'your-domain.cliff.com',
  clientId: 'your-client-id',
  redirectUri: window.location.origin
});`,

    login: `// Redirect to Cliff login
cliff.loginWithRedirect();

// Handle the callback
cliff.handleRedirectCallback().then(user => {
  console.log('User authenticated:', user);
});`,

    api: `// Get access token
const token = await cliff.getTokenSilently();

// Make authenticated API call
const response = await fetch('/api/protected', {
  headers: {
    Authorization: \`Bearer \${token}\`
  }
});`
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-white mb-4">Getting Started</h1>
              <p className="text-xl text-gray-300 mb-8">
                Welcome to Cliff. Get up and running in minutes with our authentication platform.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-400" />
                Quick Setup
              </h3>
              <div className="space-y-4">
                <div className="bg-black rounded-lg p-4 relative">
                  <div className="text-sm text-gray-400 mb-2">Install Cliff SDK</div>
                  <code className="text-green-400">{codeExamples.install}</code>
                  <button
                    onClick={() => copyToClipboard(codeExamples.install, 'install')}
                    className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded"
                  >
                    {copiedCode === 'install' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Initialize Cliff</h3>
              <div className="bg-black rounded-lg p-4 relative mb-4">
                <code className="text-blue-400 whitespace-pre-wrap">{codeExamples.init}</code>
                <button
                  onClick={() => copyToClipboard(codeExamples.init, 'init')}
                  className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded"
                >
                  {copiedCode === 'init' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <p className="text-gray-300">
                Replace <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">your-domain</code> and 
                <code className="bg-gray-800 px-2 py-1 rounded text-purple-400 ml-1">your-client-id</code> with 
                your actual Cliff application credentials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <Shield className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Secure by Default</h4>
                <p className="text-gray-300 text-sm">Built with security best practices and compliance standards.</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6">
                <Zap className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Lightning Fast</h4>
                <p className="text-gray-300 text-sm">Optimized for performance with minimal bundle size.</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6">
                <Globe className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Global Scale</h4>
                <p className="text-gray-300 text-sm">Edge locations worldwide for optimal user experience.</p>
              </div>
            </div>
          </div>
        );

      case 'authentication':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-white mb-4">Authentication</h1>
              <p className="text-xl text-gray-300 mb-8">
                Implement secure authentication flows with Cliff's flexible SDK.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Login Flow</h3>
              <div className="bg-black rounded-lg p-4 relative mb-4">
                <code className="text-green-400 whitespace-pre-wrap">{codeExamples.login}</code>
                <button
                  onClick={() => copyToClipboard(codeExamples.login, 'login')}
                  className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded"
                >
                  {copiedCode === 'login' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Social Logins</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Google OAuth 2.0</li>
                  <li>• GitHub Integration</li>
                  <li>• Microsoft Azure AD</li>
                  <li>• Custom SAML/OIDC</li>
                </ul>
              </div>
              <div className="bg-gray-900 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-3">Security Features</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>• Multi-factor authentication</li>
                  <li>• Risk-based authentication</li>
                  <li>• Session management</li>
                  <li>• Brute force protection</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'sso':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-white mb-4">Single Sign-On</h1>
              <p className="text-xl text-gray-300 mb-8">
                Enable seamless access across all your applications with enterprise SSO.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Supported Protocols</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">SAML 2.0</h4>
                  <p className="text-gray-300 text-sm">Industry standard for enterprise SSO</p>
                </div>
                <div className="bg-black rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">OpenID Connect</h4>
                  <p className="text-gray-300 text-sm">Modern authentication built on OAuth 2.0</p>
                </div>
                <div className="bg-black rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">OAuth 2.0</h4>
                  <p className="text-gray-300 text-sm">Secure authorization framework</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Configuration Steps</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-white font-semibold">1</div>
                  <div>
                    <h4 className="text-white font-semibold">Configure Identity Provider</h4>
                    <p className="text-gray-300">Set up your IdP with Cliff as a service provider</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-white font-semibold">2</div>
                  <div>
                    <h4 className="text-white font-semibold">Map Attributes</h4>
                    <p className="text-gray-300">Define how user attributes are mapped between systems</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-white font-semibold">3</div>
                  <div>
                    <h4 className="text-white font-semibold">Test & Deploy</h4>
                    <p className="text-gray-300">Validate the integration and roll out to users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api-reference':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-white mb-4">API Reference</h1>
              <p className="text-xl text-gray-300 mb-8">
                Complete reference for Cliff's REST API and SDK methods.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Making API Calls</h3>
              <div className="bg-black rounded-lg p-4 relative mb-4">
                <code className="text-yellow-400 whitespace-pre-wrap">{codeExamples.api}</code>
                <button
                  onClick={() => copyToClipboard(codeExamples.api, 'api')}
                  className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded"
                >
                  {copiedCode === 'api' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Authentication Endpoints</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-green-400">POST /auth/login</code>
                      <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">AUTH</span>
                    </div>
                    <p className="text-gray-300 text-sm">Authenticate user credentials</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-blue-400">GET /auth/user</code>
                      <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded">USER</span>
                    </div>
                    <p className="text-gray-300 text-sm">Get current user profile</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-red-400">POST /auth/logout</code>
                      <span className="text-xs bg-red-900 text-red-300 px-2 py-1 rounded">AUTH</span>
                    </div>
                    <p className="text-gray-300 text-sm">End user session</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Management API</h3>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-purple-400">GET /api/users</code>
                      <span className="text-xs bg-purple-900 text-purple-300 px-2 py-1 rounded">ADMIN</span>
                    </div>
                    <p className="text-gray-300 text-sm">List all users</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-yellow-400">PUT /api/users/:id</code>
                      <span className="text-xs bg-yellow-900 text-yellow-300 px-2 py-1 rounded">ADMIN</span>
                    </div>
                    <p className="text-gray-300 text-sm">Update user details</p>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-orange-400">GET /api/logs</code>
                      <span className="text-xs bg-orange-900 text-orange-300 px-2 py-1 rounded">ADMIN</span>
                    </div>
                    <p className="text-gray-300 text-sm">Access audit logs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-white mb-4">Integrations</h1>
              <p className="text-xl text-gray-300 mb-8">
                Connect Cliff with your favorite tools and frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'React', desc: 'Official React SDK with hooks', color: 'blue' },
                { name: 'Vue.js', desc: 'Vue 3 composition API support', color: 'green' },
                { name: 'Angular', desc: 'Angular service and guards', color: 'red' },
                { name: 'Node.js', desc: 'Server-side authentication', color: 'green' },
                { name: 'Python', desc: 'Flask and Django integrations', color: 'yellow' },
                { name: 'Next.js', desc: 'Full-stack authentication', color: 'purple' }
              ].map((integration, i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-colors">
                  <div className={`w-12 h-12 bg-${integration.color}-900 rounded-lg flex items-center justify-center mb-4`}>
                    <Code className={`w-6 h-6 text-${integration.color}-400`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{integration.name}</h3>
                  <p className="text-gray-300 text-sm">{integration.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Enterprise Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-2">Identity Providers</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Active Directory</li>
                    <li>• LDAP</li>
                    <li>• Okta</li>
                    <li>• Azure AD</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Business Tools</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Slack</li>
                    <li>• Microsoft Teams</li>
                    <li>• Salesforce</li>
                    <li>• ServiceNow</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-light text-white mb-4">Security</h1>
              <p className="text-xl text-gray-300 mb-8">
                Cliff is built with security-first principles and enterprise-grade compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-red-900 rounded-xl p-6">
                <Shield className="w-8 h-8 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Compliance Standards</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• SOC 2 Type II certified</li>
                  <li>• GDPR compliant</li>
                  <li>• HIPAA ready</li>
                  <li>• ISO 27001 certified</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl p-6">
                <Zap className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Security Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• End-to-end encryption</li>
                  <li>• Zero-trust architecture</li>
                  <li>• Advanced threat detection</li>
                  <li>• Real-time monitoring</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-4">Security Best Practices</h3>
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Token Security</h4>
                  <p className="text-gray-300 mb-3">Always use HTTPS and secure token storage practices.</p>
                  <div className="bg-black rounded p-3">
                    <code className="text-green-400">
                      // Store tokens securely{'\n'}
                      const token = await cliff.getTokenSilently();{'\n'}
                      // Never store in localStorage for sensitive apps
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-white mb-6">Documentation</h2>
              <nav className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left ${
                        activeSection === item.id
                          ? 'bg-purple-900 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                        activeSection === item.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;