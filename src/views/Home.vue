<template>
  <div class="home-container">
    <!-- Header with Auth Buttons -->
    <div class="auth-header">
      <div class="header-content">
        <div class="logo">
          <h2>MarketSystem Pro</h2>
        </div>
        <div class="header-right">
          <el-menu
            mode="horizontal"
            :router="false"
            class="nav-menu"
            @select="handleMenuSelect"
          >
            <el-menu-item index="features">Features</el-menu-item>
            <el-menu-item index="pricing">Pricing</el-menu-item>
            <el-menu-item index="testimonials">Testimonials</el-menu-item>
            <el-menu-item index="contact">Contact</el-menu-item>
          </el-menu>
          <div class="auth-buttons">
            <el-button type="success" @click="goToLogin">Login</el-button>
            <el-button type="info" @click="goToRegister">Register</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>MarketSystem Pro</h1>
        <h2>Complete Sales Management Solution</h2>
        <p>Streamline your business operations with our powerful sales management software</p>
        <div class="hero-buttons">
          <el-button type="primary" size="large" @click="scrollToFeatures">Learn More</el-button>
          <el-button size="large" @click="contactUs">Contact Us</el-button>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div id="features" class="features-section">
      <h2 class="section-title">Key Features</h2>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon class="feature-icon"><DataLine /></el-icon>
            <h3>Sales Analytics</h3>
            <p>Comprehensive dashboards and reports to track sales performance, revenue, and customer behavior.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon class="feature-icon"><Goods /></el-icon>
            <h3>Product Management</h3>
            <p>Easily manage your product inventory, track stock levels, and monitor product performance.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon class="feature-icon"><List /></el-icon>
            <h3>Order Processing</h3>
            <p>Streamline order fulfillment with automated workflows and status tracking.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon class="feature-icon"><User /></el-icon>
            <h3>Customer Management</h3>
            <p>Build stronger relationships with detailed customer profiles and purchase history.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon class="feature-icon"><Document /></el-icon>
            <h3>Reporting Tools</h3>
            <p>Generate customizable reports to gain insights and make data-driven decisions.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8">
          <div class="feature-card">
            <el-icon class="feature-icon"><Setting /></el-icon>
            <h3>Customization</h3>
            <p>Tailor the system to your specific business needs with flexible configuration options.</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Benefits Section -->
    <div class="benefits-section">
      <h2 class="section-title">Why Choose MarketSystem Pro?</h2>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12">
          <div class="benefit-item">
            <h3><el-icon><Check /></el-icon> Increase Sales Efficiency</h3>
            <p>Our intuitive interface helps your team close deals faster and manage customer relationships more effectively.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12">
          <div class="benefit-item">
            <h3><el-icon><Check /></el-icon> Reduce Operational Costs</h3>
            <p>Automate routine tasks and streamline workflows to save time and reduce administrative overhead.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12">
          <div class="benefit-item">
            <h3><el-icon><Check /></el-icon> Improve Customer Satisfaction</h3>
            <p>Deliver better service with comprehensive customer profiles and order history at your fingertips.</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12">
          <div class="benefit-item">
            <h3><el-icon><Check /></el-icon> Make Data-Driven Decisions</h3>
            <p>Access real-time analytics and reports to identify trends and make informed business decisions.</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Screenshots Section -->
    <div class="screenshots-section">
      <h2 class="section-title">See It In Action</h2>
      <el-carousel :interval="5000" type="card" height="400px">
        <el-carousel-item v-for="(item, index) in screenshots" :key="index">
          <div class="screenshot-item">
            <img :src="item.image" :alt="item.title" />
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- Pricing Section -->
    <div class="pricing-section">
      <h2 class="section-title">Pricing Plans</h2>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="8">
          <el-card class="pricing-card">
            <template #header>
              <div class="pricing-header">
                <h3>Starter</h3>
                <div class="price">$49<span>/month</span></div>
              </div>
            </template>
            <div class="pricing-features">
              <p><el-icon><Check /></el-icon> Up to 5 users</p>
              <p><el-icon><Check /></el-icon> Basic reporting</p>
              <p><el-icon><Check /></el-icon> Product management</p>
              <p><el-icon><Check /></el-icon> Order processing</p>
              <p><el-icon><Check /></el-icon> Email support</p>
            </div>
            <el-button type="primary" class="pricing-button">Get Started</el-button>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-card class="pricing-card featured">
            <template #header>
              <div class="pricing-header">
                <h3>Professional</h3>
                <div class="price">$99<span>/month</span></div>
              </div>
            </template>
            <div class="pricing-features">
              <p><el-icon><Check /></el-icon> Up to 20 users</p>
              <p><el-icon><Check /></el-icon> Advanced reporting</p>
              <p><el-icon><Check /></el-icon> Customer management</p>
              <p><el-icon><Check /></el-icon> Inventory tracking</p>
              <p><el-icon><Check /></el-icon> Priority support</p>
            </div>
            <el-button type="primary" class="pricing-button">Get Started</el-button>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="8">
          <el-card class="pricing-card">
            <template #header>
              <div class="pricing-header">
                <h3>Enterprise</h3>
                <div class="price">$199<span>/month</span></div>
              </div>
            </template>
            <div class="pricing-features">
              <p><el-icon><Check /></el-icon> Unlimited users</p>
              <p><el-icon><Check /></el-icon> Custom reporting</p>
              <p><el-icon><Check /></el-icon> API access</p>
              <p><el-icon><Check /></el-icon> Advanced analytics</p>
              <p><el-icon><Check /></el-icon> 24/7 support</p>
            </div>
            <el-button type="primary" class="pricing-button">Get Started</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Testimonials Section -->
    <div class="testimonials-section">
      <h2 class="section-title">What Our Customers Say</h2>
      <el-row :gutter="30">
        <el-col :xs="24" 
          :sm="8" 
          v-for="(testimonial, index) in testimonials" 
          :key="index">
          <el-card class="testimonial-card">
            <div class="testimonial-content">
              <p class="quote">"{{ testimonial.quote }}"</p>
              <div class="testimonial-author">
                <h4>{{ testimonial.name }}</h4>
                <p>{{ testimonial.position }}, {{ testimonial.company }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- Contact Section -->
    <div id="contact" class="contact-section">
      <h2 class="section-title">Get In Touch</h2>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12">
          <div class="contact-info">
            <h3>Contact Information</h3>
            <p><el-icon><Location /></el-icon> 123 Business Ave, Suite 100, City, Country</p>
            <p><el-icon><Phone /></el-icon> +1 (555) 123-4567</p>
            <p><el-icon><Message /></el-icon> info@marketsystempro.com</p>
            <div class="social-links">
              <el-button circle><el-icon><Share /></el-icon></el-button>
              <el-button circle><el-icon><Share /></el-icon></el-button>
              <el-button circle><el-icon><Share /></el-icon></el-button>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form :model="contactForm" label-width="80px" class="contact-form">
            <el-form-item label="Name">
              <el-input v-model="contactForm.name" 
                placeholder="Your name" />
            </el-form-item>
            <el-form-item label="Email">
              <el-input v-model="contactForm.email" 
                placeholder="Your email" />
            </el-form-item>
            <el-form-item label="Company">
              <el-input v-model="contactForm.company" 
                placeholder="Your company" />
            </el-form-item>
            <el-form-item label="Message">
              <el-input v-model="contactForm.message" 
                type="textarea" 
                rows="4" 
                placeholder="Your message" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitContactForm">Send Message</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <h2>MarketSystem Pro</h2>
          <p>Complete Sales Management Solution</p>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#screenshots">Screenshots</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 MarketSystem Pro. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import {
  DataLine,
  Goods,
  List,
  User,
  Document,
  Setting,
  Check,
  Location,
  Phone,
  Message,
  Share
} from '@element-plus/icons-vue'

export default defineComponent({
  name: 'Home',
  components: {
    DataLine,
    Goods,
    List,
    User,
    Document,
    Setting,
    Check,
    Location,
    Phone,
    Message,
    Share
  },
  setup() {
    const router = useRouter()
    const contactForm = ref({
      name: '',
      email: '',
      company: '',
      message: ''
    })

    const screenshots = [
      {
        image: 'https://via.placeholder.com/800x450?text=Dashboard',
        title: 'Dashboard',
        description: 'Get a comprehensive overview of your business performance at a glance.'
      },
      {
        image: 'https://via.placeholder.com/800x450?text=Products',
        title: 'Product Management',
        description: 'Easily manage your product catalog and inventory.'
      },
      {
        image: 'https://via.placeholder.com/800x450?text=Orders',
        title: 'Order Processing',
        description: 'Streamline your order fulfillment process.'
      },
      {
        image: 'https://via.placeholder.com/800x450?text=Reports',
        title: 'Reports & Analytics',
        description: 'Generate detailed reports to make data-driven decisions.'
      }
    ]

    const testimonials = [
      {
        quote: 'MarketSystem Pro has transformed how we manage our sales process. Our team is more efficient and our customers are happier.',
        name: 'Sarah Johnson',
        position: 'Sales Director',
        company: 'Tech Solutions Inc.'
      },
      {
        quote: 'The reporting features alone have saved us countless hours of manual work. This software pays for itself.',
        name: 'Michael Chen',
        position: 'CEO',
        company: 'Global Retailers'
      },
      {
        quote: 'We\'ve seen a 25% increase in sales since implementing MarketSystem Pro. The customer management features are outstanding.',
        name: 'Emily Rodriguez',
        position: 'Operations Manager',
        company: 'Fashion Forward'
      }
    ]

    const scrollToFeatures = () => {
      const featuresSection = document.getElementById('features')
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const contactUs = () => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const goToLogin = () => {
      router.push('/login')
    }

    const goToRegister = () => {
      router.push('/register')
    }

    const submitContactForm = () => {
      // TODO: Implement form submission
      ElMessage.success('Thank you for your message! We will get back to you soon.')
      contactForm.value = {
        name: '',
        email: '',
        company: '',
        message: ''
      }
    }

    const handleMenuSelect = (key: string) => {
      const element = document.getElementById(key)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return {
      contactForm,
      screenshots,
      testimonials,
      scrollToFeatures,
      contactUs,
      submitContactForm,
      goToLogin,
      goToRegister,
      handleMenuSelect
    }
  }
})
</script>

<style scoped>
.home-container {
  font-family: 'Arial', sans-serif;
}

/* Auth Header */
.auth-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 20px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo h2 {
  margin: 0;
  color: #409EFF;
  font-size: 1.5rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-menu {
  border-bottom: none;
  background: transparent;
}

.nav-menu .el-menu-item {
  height: 60px;
  line-height: 60px;
  color: #606266;
}

.nav-menu .el-menu-item:hover {
  color: #409EFF;
}

.nav-menu .el-menu-item.is-active {
  color: #409EFF;
  border-bottom: 2px solid #409EFF;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #409EFF 0%, #304156 100%);
  color: white;
  padding: 100px 20px;
  text-align: center;
  margin-top: 60px; /* Add margin to account for fixed header */
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-content h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  font-weight: 400;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Section Styles */
.section-title {
  text-align: center;
  margin-bottom: 50px;
  font-size: 2.2rem;
  color: #303133;
}

.features-section,
.benefits-section,
.screenshots-section,
.pricing-section,
.testimonials-section,
.contact-section {
  padding: 80px 20px;
}

.features-section {
  background-color: #f5f7fa;
}

/* Feature Cards */
.feature-card {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: transform 0.3s;
  margin-bottom: 30px;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  color: #409EFF;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin-bottom: 15px;
  color: #303133;
}

/* Benefits Section */
.benefit-item {
  margin-bottom: 30px;
}

.benefit-item h3 {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  color: #303133;
}

.benefit-item h3 .el-icon {
  color: #67C23A;
  margin-right: 10px;
}

/* Screenshots Section */
.screenshot-item {
  text-align: center;
  padding: 20px;
}

.screenshot-item img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.screenshot-item h3 {
  margin: 20px 0 10px;
  color: #303133;
}

/* Pricing Section */
.pricing-card {
  text-align: center;
  height: 100%;
  transition: transform 0.3s;
}

.pricing-card:hover {
  transform: translateY(-5px);
}

.pricing-card.featured {
  border: 2px solid #409EFF;
  transform: scale(1.05);
}

.pricing-card.featured:hover {
  transform: scale(1.05) translateY(-5px);
}

.pricing-header {
  padding: 20px 0;
}

.pricing-header h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #303133;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #409EFF;
}

.price span {
  font-size: 1rem;
  font-weight: normal;
  color: #909399;
}

.pricing-features {
  margin: 30px 0;
  text-align: left;
}

.pricing-features p {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.pricing-features .el-icon {
  color: #67C23A;
  margin-right: 10px;
}

.pricing-button {
  width: 100%;
}

/* Testimonials Section */
.testimonial-card {
  height: 100%;
}

.testimonial-content {
  padding: 20px;
}

.quote {
  font-style: italic;
  margin-bottom: 20px;
  color: #606266;
}

.testimonial-author h4 {
  margin-bottom: 5px;
  color: #303133;
}

.testimonial-author p {
  color: #909399;
  font-size: 0.9rem;
}

/* Contact Section */
.contact-info {
  margin-bottom: 30px;
}

.contact-info h3 {
  margin-bottom: 20px;
  color: #303133;
}

.contact-info p {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-info .el-icon {
  margin-right: 10px;
  color: #409EFF;
}

.social-links {
  margin-top: 30px;
  display: flex;
  gap: 10px;
}

.contact-form {
  max-width: 100%;
}

/* Footer */
.footer {
  background-color: #304156;
  color: white;
  padding: 60px 20px 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-logo h2 {
  margin-bottom: 10px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.footer-column h4 {
  margin-bottom: 20px;
  color: #bfcbd9;
}

.footer-column ul {
  list-style: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: #bfcbd9;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column ul li a:hover {
  color: #409EFF;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #bfcbd9;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content h2 {
    font-size: 1.5rem;
  }
  
  .footer-content {
    flex-direction: column;
  }
  
  .footer-logo {
    margin-bottom: 30px;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 30px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-buttons .el-button {
    width: 100%;
    max-width: 200px;
  }

  .auth-header {
    padding: 10px;
  }
  
  .auth-buttons {
    flex-direction: column;
  }
  
  .auth-buttons .el-button {
    width: 100px;
  }
  
  .hero-section {
    margin-top: 100px; /* Increased margin for mobile */
  }

  .header-content {
    flex-direction: column;
    height: auto;
    padding: 10px 0;
  }

  .logo {
    margin-bottom: 10px;
  }

  .header-right {
    flex-direction: column;
    width: 100%;
  }

  .nav-menu {
    width: 100%;
    margin-bottom: 10px;
  }

  .nav-menu .el-menu-item {
    height: 40px;
    line-height: 40px;
  }

  .auth-buttons {
    width: 100%;
    justify-content: center;
  }

  .auth-buttons .el-button {
    width: 100px;
  }

  .hero-section {
    margin-top: 140px; /* Increased margin for mobile */
  }
}
</style> 