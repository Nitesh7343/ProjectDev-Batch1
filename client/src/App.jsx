import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Login from './Login';
import Signup from './Signup';
import HeroThreeScene from './three/HeroThreeScene';
import ParkingLotScene from './three/ParkingLotScene';

const initialForm = {
  name: '',
  city: '',
  pricePerDay: '',
  capacity: '',
  availableSpots: '',
  transitAccess: true,
  description: '',
};

const initialReservationForm = {
  fullName: '',
  vehicleNumber: '',
  vehicleModel: '',
  licenseNumber: '',
  paymentMethod: 'Card',
};

const filters = ['All', 'Transit access', 'Open spots', 'Budget'];

const dashboardNavItems = [
  { label: 'Overview', page: 'overview' },
  { label: 'Locations', page: 'locations' },
  { label: 'Add location', page: 'add-location' },
  { label: 'Support', page: 'support' },
];

const authNavItems = [
  { label: 'Home', page: 'overview' },
  { label: 'Sign in', page: 'login' },
  { label: 'Sign up', page: 'signup' },
];

const paymentMethodLabels = {
  Card: 'Card / Credit / Debit',
  UPI: 'UPI',
  'Net Banking': 'Net Banking',
};

const featureCards = [
  {
    title: 'Live lot occupancy',
    description: 'Track open vs occupied bays for each Park and Ride lot before you leave home.',
  },
  {
    title: 'Station-linked planning',
    description: 'Filter by rail, bus, and shuttle-connected lots to reduce transfer time.',
  },
  {
    title: 'One-tap reservations',
    description: 'Book a commuter slot in seconds and avoid full-lot surprises during peak hours.',
  },
];

const premiumMembershipBenefits = [
  'Priority booking windows for station-adjacent Park and Ride lots',
  'Saved commute profiles with preferred lot, entry time, and vehicle details',
  'Early access to newly launched premium lots on high-demand routes',
];

const premiumMembershipStats = [
  { label: 'Monthly plan', value: '$9' },
  { label: 'Included perks', value: 'Priority booking, saved commute profile' },
  { label: 'Support level', value: 'Priority commuter support desk' },
];

const overviewHighlights = [
  {
    title: 'Peak arrival window',
    value: '6:30 - 9:00 AM',
    description: 'Highest entry traffic for downtown-bound Park and Ride riders.',
  },
  {
    title: 'Best lot profile',
    value: 'Transit-ready',
    description: 'Best match for riders needing short walk access to rail or express bus.',
  },
  {
    title: 'Typical day rate',
    value: '$11',
    description: 'Current median daily price across active Park and Ride locations.',
  },
];

const storySlides = [
  {
    kicker: 'Stage 01',
    title: 'Check lot availability before the commute starts.',
    copy: 'Start with a live view of lot occupancy so riders can choose a lot before morning traffic builds.',
    label: 'Live lot scan',
    metric: 'Open spots by lot',
  },
  {
    kicker: 'Stage 02',
    title: 'Compare transit-connected lots in one flow.',
    copy: 'Review pricing, capacity, and transit access side by side to pick the best Park and Ride option.',
    label: 'Transit compare',
    metric: 'Rate + capacity + access',
  },
  {
    kicker: 'Stage 03',
    title: 'Reserve faster with premium commuter tools.',
    copy: 'Finish with priority booking options built for frequent riders who park daily near major stations.',
    label: 'Premium tools',
    metric: 'Faster repeat booking',
  },
];

const supportItems = [
  {
    title: 'Need a spot for today?',
    description: 'Open Locations, filter by transit access or budget, and reserve an open bay in one step.',
  },
  {
    title: 'Managing lot operations?',
    description: 'Use Add location to publish new Park and Ride lots with pricing, capacity, and access details.',
  },
  {
    title: 'Improving rider experience?',
    description: 'Use support to refine booking flow, lot metadata, and commuter guidance content.',
  },
];

const supportQuickActions = [
  {
    title: 'Chat for booking help',
    description: 'Get immediate guidance for failed reservations, full lots, or commuter booking issues.',
    action: 'chat',
    icon: 'chat',
  },
  {
    title: 'Email lot operations',
    description: 'Report lot data issues, pricing updates, or transit access corrections.',
    action: 'email',
    icon: 'email',
  },
  {
    title: 'Open rider docs',
    description: 'Review reservation steps, filter logic, and lot publishing standards.',
    action: 'docs',
    icon: 'docs',
  },
];

const supportFaq = [
  {
    question: 'How do I reserve a Park and Ride spot?',
    answer: 'Go to Locations, pick a lot with open bays, then click Reserve a spot to confirm availability.',
  },
  {
    question: 'How do I publish a new lot for riders?',
    answer: 'Open Add location, complete lot details and transit access, then submit to publish it to the dashboard.',
  },
  {
    question: 'What if my preferred lot is full?',
    answer: 'Use Open spots and Transit access filters to find nearby alternatives on the same commute corridor.',
  },
];

const supportMetrics = [
  {
    label: 'Commuter support response',
    value: 'Typically under 1 business day',
  },
  {
    label: 'Most common requests',
    value: 'Booking failures, lot updates, transit access details',
  },
  {
    label: 'Coverage',
    value: 'Rider booking help, operator workflows, and documentation',
  },
];

function ProjectIllustration({ variant }) {
  if (variant === 'availability') {
    return (
      <svg viewBox="0 0 240 160" className="project-illustration" aria-hidden="true">
        <rect x="18" y="22" width="204" height="116" rx="20" fill="#0f1724" />
        <rect x="38" y="40" width="64" height="18" rx="9" fill="#203246" />
        <rect x="38" y="70" width="28" height="28" rx="8" fill="#36d399" />
        <rect x="74" y="70" width="28" height="28" rx="8" fill="#ef6a6a" />
        <rect x="110" y="70" width="28" height="28" rx="8" fill="#36d399" />
        <rect x="146" y="70" width="28" height="28" rx="8" fill="#ef6a6a" />
        <rect x="182" y="70" width="20" height="28" rx="8" fill="#36d399" />
        <circle cx="180" cy="112" r="12" fill="#f6c165" />
        <rect x="48" y="108" width="108" height="8" rx="4" fill="#334c72" />
      </svg>
    );
  }

  if (variant === 'transit') {
    return (
      <svg viewBox="0 0 240 160" className="project-illustration" aria-hidden="true">
        <rect x="16" y="22" width="208" height="116" rx="20" fill="#132033" />
        <path d="M46 116L92 76L130 90L182 50" stroke="#f6c165" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="46" cy="116" r="8" fill="#fff" />
        <circle cx="92" cy="76" r="8" fill="#36d399" />
        <circle cx="130" cy="90" r="8" fill="#fff" />
        <circle cx="182" cy="50" r="8" fill="#36d399" />
        <rect x="162" y="88" width="42" height="24" rx="12" fill="#334c72" />
        <rect x="168" y="94" width="30" height="6" rx="3" fill="#fff" />
      </svg>
    );
  }

  if (variant === 'premium') {
    return (
      <svg viewBox="0 0 240 160" className="project-illustration" aria-hidden="true">
        <rect x="16" y="22" width="208" height="116" rx="20" fill="#102033" />
        <circle cx="120" cy="72" r="30" fill="#f6c165" />
        <path d="M120 52l6.6 13.4 14.8 2.2-10.7 10.4 2.5 14.8-13.2-7-13.2 7 2.5-14.8-10.7-10.4 14.8-2.2z" fill="#fff" />
        <rect x="60" y="108" width="120" height="14" rx="7" fill="#334c72" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 160" className="project-illustration" aria-hidden="true">
      <rect x="16" y="22" width="208" height="116" rx="20" fill="#132033" />
      <rect x="38" y="40" width="68" height="18" rx="9" fill="#203246" />
      <rect x="38" y="72" width="74" height="34" rx="14" fill="#334c72" />
      <rect x="122" y="60" width="72" height="46" rx="16" fill="#f6c165" />
      <circle cx="78" cy="118" r="10" fill="#fff" />
      <circle cx="164" cy="118" r="10" fill="#fff" />
    </svg>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [locations, setLocations] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ loading: true, message: '' });
  const [supportModal, setSupportModal] = useState(null);
  const [reservationModal, setReservationModal] = useState(null);
  const [reservationForm, setReservationForm] = useState(initialReservationForm);
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [activeStorySlide, setActiveStorySlide] = useState(0);
  const [toast, setToast] = useState(null);
  const storySlideRefs = useRef([]);

  function showToast(message, kind = 'info') {
    setToast({ message, kind, key: Date.now() });
  }

  async function loadLocations() {
    setStatus({ loading: true, message: '' });
    try {
      const response = await fetch('/api/locations');
      const payload = await response.json();
      setLocations(payload.data || []);
    } catch {
      setStatus({ loading: false, message: 'Unable to load locations.' });
      showToast('Unable to load locations right now.', 'error');
      return;
    }
    setStatus({ loading: false, message: '' });
  }

  function handleNavigation(page) {
    setCurrentPage(page);
  }

  function handleBackToTop() {
    setCurrentPage('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openSupportModal(action) {
    setSupportModal(action);
  }

  function closeSupportModal() {
    setSupportModal(null);
  }

  function openReservationModal(location) {
    setReservationModal(location);
    setReservationForm(initialReservationForm);
  }

  function closeReservationModal() {
    if (isSubmittingReservation) {
      return;
    }
    setReservationModal(null);
  }

  useEffect(() => {
    loadLocations();
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setToast(null);
    }, 2800);

    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  useEffect(() => {
    if (currentPage !== 'overview') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleEntry) {
          const slideIndex = Number(visibleEntry.target.getAttribute('data-story-index'));
          if (!Number.isNaN(slideIndex)) {
            setActiveStorySlide(slideIndex);
          }
        }
      },
      {
        threshold: [0.45, 0.6, 0.75],
        rootMargin: '-10% 0px -20% 0px',
      },
    );

    storySlideRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [currentPage]);

  async function handleReserve(id) {
    try {
      const response = await fetch(`/api/locations/${id}/reserve`, { method: 'POST' });
      const payload = await response.json();

      if (!response.ok) {
        const errorMessage = payload.message || 'Reservation failed.';
        setStatus({ loading: false, message: errorMessage });
        showToast(errorMessage, 'error');
        return false;
      }

      setStatus({ loading: false, message: 'Spot reserved successfully.' });
      showToast('Spot reserved successfully.', 'success');
      setLocations((current) => current.map((location) => (location.id === id ? payload.data : location)));
      return true;
    } catch {
      const errorMessage = 'Unable to complete reservation right now.';
      setStatus({ loading: false, message: errorMessage });
      showToast(errorMessage, 'error');
      return false;
    }
  }

  async function handleReservationSubmit(event) {
    event.preventDefault();

    if (!reservationModal) {
      return;
    }

    setIsSubmittingReservation(true);

    const paymentDetails = {
      location: reservationModal,
      customer: { ...reservationForm },
      amount: reservationModal.pricePerDay,
      createdAt: new Date().toISOString(),
    };

    setPendingPayment(paymentDetails);
    setReservationModal(null);
    setReservationForm(initialReservationForm);
    setCurrentPage('payment');
    setIsSubmittingReservation(false);
  }

  async function handleConfirmPayment() {
    if (!pendingPayment) {
      return;
    }

    setIsProcessingPayment(true);
    const success = await handleReserve(pendingPayment.location.id);
    setIsProcessingPayment(false);

    if (!success) {
      return;
    }

    showToast(`Payment successful for ${pendingPayment.customer.fullName}.`, 'success');
    setPendingPayment(null);
    setCurrentPage('locations');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch('/api/locations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        pricePerDay: Number(form.pricePerDay),
        capacity: Number(form.capacity),
        availableSpots: form.availableSpots ? Number(form.availableSpots) : undefined,
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      const errorMessage = payload.message || 'Failed to add location.';
      setStatus({ loading: false, message: errorMessage });
      showToast(errorMessage, 'error');
      return;
    }

    setLocations((current) => [payload.data, ...current]);
    setForm(initialForm);
    setStatus({ loading: false, message: 'Location added successfully.' });
    showToast('Location added successfully.', 'success');
    setCurrentPage('locations');
  }

  const visibleLocations = locations.filter((location) => {
    const searchQuery = locationSearchQuery.trim().toLowerCase();

    if (searchQuery) {
      const searchableText = `${location.name} ${location.city} ${location.description}`.toLowerCase();
      if (!searchableText.includes(searchQuery)) {
        return false;
      }
    }

    if (activeFilter === 'Transit access') {
      return location.transitAccess;
    }
    if (activeFilter === 'Open spots') {
      return location.availableSpots > 0;
    }
    if (activeFilter === 'Budget') {
      return location.pricePerDay <= 12;
    }
    return true;
  });

  const totalSpots = locations.reduce((sum, location) => sum + location.capacity, 0);
  const availableSpots = locations.reduce((sum, location) => sum + location.availableSpots, 0);
  const transitLocations = locations.filter((location) => location.transitAccess).length;
  const currentNavItems = currentPage === 'login' || currentPage === 'signup' ? authNavItems : dashboardNavItems;

  function renderBrand() {
    return (
      <button className="brand" type="button" onClick={() => handleNavigation('overview')}>
        <span className="brand-mark">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="44" height="44" rx="14" fill="url(#gradient)" />
            <g opacity="1">
              <circle cx="14" cy="22" r="2" fill="white" opacity="0.4" />
              <circle cx="30" cy="22" r="2" fill="white" opacity="0.4" />
              <path d="M12 14H32C33.1046 14 34 14.8954 34 16V26C34 27.1046 33.1046 28 32 28H12C10.8954 28 10 27.1046 10 26V16C10 14.8954 10.8954 14 12 14Z" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 22C16 24.2091 14.2091 26 12 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M28 22C28 24.2091 29.7909 26 32 26" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14 18C14 17.4477 14.4477 17 15 17H29C29.5523 17 30 17.4477 30 18V20H14V18Z" fill="white" opacity="0.8" />
            </g>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="44" y2="44">
                <stop offset="0%" stopColor="#102033" />
                <stop offset="100%" stopColor="#334c72" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span>
          <strong>Park and Ride</strong>
          <small>Commuter parking dashboard</small>
        </span>
      </button>
    );
  }

  function renderHeaderActions() {
    if (currentPage === 'login' || currentPage === 'signup') {
      return (
        <div className="header-actions">
          <button className="ghost-button" type="button" onClick={() => handleNavigation('overview')}>
            Back to home
          </button>
        </div>
      );
    }

    return (
      <div className="header-actions">
        <button className="ghost-button" type="button" onClick={() => handleNavigation('login')}>
          Sign in
        </button>
        <button className="primary-button header-action" type="button" onClick={() => handleNavigation('signup')}>
          Sign up
        </button>
      </div>
    );
  }

  function renderNav() {
    return (
      <nav className="site-nav" aria-label="Primary navigation">
        {currentNavItems.map((item) => {
          if (
            currentPage === 'dashboard' ||
            currentPage === 'overview' ||
            currentPage === 'locations' ||
            currentPage === 'add-location' ||
            currentPage === 'support' ||
            currentPage === 'payment'
          ) {
            return (
              <button
                key={item.page}
                type="button"
                className={item.page === currentPage ? 'site-nav__button is-active' : 'site-nav__button'}
                onClick={() => handleNavigation(item.page)}
              >
                {item.label}
              </button>
            );
          }

          return null;
        })}
      </nav>
    );
  }

  function renderOverviewPage() {
    return (
      <main className="page-shell app-main">
        <section className="hero-panel hero-panel--overview">
          <div>
            <p className="eyebrow">Park and Ride network</p>
            <h1>Smarter commuter parking, one dashboard away.</h1>
            <p className="hero-copy">
              Track commuter lots, reserve open spots, compare pricing, and manage transit-ready parking in one clean MERN app.
            </p>

            <div className="hero-actions">
              <button className="primary-button hero-action" type="button" onClick={() => handleNavigation('locations')}>
                Explore locations
              </button>
              <button className="ghost-button hero-action" type="button" onClick={() => handleNavigation('add-location')}>
                Add location
              </button>
            </div>
          </div>

          <div className="hero-visual-stack">
            <div className="hero-canvas-shell" aria-label="3D car animation" role="img">
              <Canvas
                className="hero-canvas"
                dpr={[1, 1.5]}
                camera={{ position: [0, 1.55, 5.5], fov: 38 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                shadows
                frameloop="always"
              >
                <HeroThreeScene />
              </Canvas>
            </div>

            <div className="hero-stats">
              <div>
                <span>Lots</span>
                <strong>{locations.length}</strong>
              </div>
              <div>
                <span>Available spots</span>
                <strong>{availableSpots}</strong>
              </div>
              <div>
                <span>Transit-linked lots</span>
                <strong>{transitLocations}</strong>
              </div>
              <div>
                <span>Total capacity</span>
                <strong>{totalSpots}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="dora-story" aria-label="Scroll story">
          <div className="dora-story__sticky panel">
            <p className="section-label">Scroll experience</p>
            <h2>{storySlides[activeStorySlide].title}</h2>
            <p className="panel-copy">{storySlides[activeStorySlide].copy}</p>

            <div className="dora-story__preview">
              <span>{storySlides[activeStorySlide].label}</span>
              <strong>{storySlides[activeStorySlide].metric}</strong>
            </div>

            <div className="dora-story__dots" aria-hidden="true">
              {storySlides.map((slide, index) => (
                <span key={slide.kicker} className={index === activeStorySlide ? 'is-active' : ''} />
              ))}
            </div>
          </div>

          <div className="dora-story__slides">
            {storySlides.map((slide, index) => (
              <article
                key={slide.kicker}
                className={index === activeStorySlide ? 'dora-story__slide is-active' : 'dora-story__slide'}
                data-story-index={index}
                ref={(node) => {
                  storySlideRefs.current[index] = node;
                }}
              >
                <p className="section-label">{slide.kicker}</p>
                <h3>{slide.title}</h3>
                <p>{slide.copy}</p>
                <div className="dora-story__art" aria-hidden="true">
                  <ProjectIllustration variant={index === 0 ? 'availability' : index === 1 ? 'transit' : 'premium'} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-strip" aria-label="Project highlights">
          {featureCards.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-card__media" aria-hidden="true">
                <ProjectIllustration variant={index === 0 ? 'availability' : index === 1 ? 'transit' : 'premium'} />
              </div>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="panel premium-panel" aria-label="Premium membership">
          <div className="premium-panel__intro">
            <p className="section-label">Premium membership</p>
            <h2>Upgrade the commute with faster booking and priority access.</h2>
            <p className="panel-copy">
              Built for riders who want less friction, more convenience, and a cleaner parking workflow every day.
            </p>

            <div className="premium-panel__media" aria-hidden="true">
              <ProjectIllustration variant="premium" />
            </div>

            <div className="premium-benefits">
              {premiumMembershipBenefits.map((benefit) => (
                <div className="premium-benefit" key={benefit}>
                  <span aria-hidden="true">✓</span>
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="premium-card">
            <div className="premium-card__top">
              <p className="premium-card__tag">Most popular</p>
              <h3>Premium Rider</h3>
              <p className="premium-card__price">
                <strong>$9</strong>
                <span>/ month</span>
              </p>
            </div>

            <div className="premium-card__stats">
              {premiumMembershipStats.map((stat) => (
                <div key={stat.label}>
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>

            <button className="primary-button premium-card__button" type="button" onClick={() => handleNavigation('signup')}>
              Start premium
            </button>
          </aside>
        </section>

        <section className="panel insight-panel">
          <p className="section-label">Today</p>
          <div className="insight-grid">
            {overviewHighlights.map((item) => (
              <article className="insight-card" key={item.title}>
                <p className="insight-card__label">{item.title}</p>
                <strong>{item.value}</strong>
                <span>{item.description}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    );
  }

  function renderLocationsPage() {
    return (
      <main className="page-shell app-main">
        <section className="content-grid content-grid--single">
          <article className="panel">
            <section className="locations-hero">
              <div className="locations-hero__copy">
                <p className="section-label">Locations atlas</p>
                <h2>Find the best lot faster with a cleaner, more visual layout.</h2>
                <p className="panel-copy">
                  Compare pricing, transit access, and live availability in one place. The page now feels more like a guided
                  experience, with motion and hierarchy that make every location easier to scan.
                </p>

                <div className="locations-hero__metrics" aria-label="Location summary">
                  <div>
                    <span>Active lots</span>
                    <strong>{locations.length}</strong>
                  </div>
                  <div>
                    <span>Open spots</span>
                    <strong>{availableSpots}</strong>
                  </div>
                  <div>
                    <span>Transit-ready</span>
                    <strong>{transitLocations}</strong>
                  </div>
                </div>
              </div>

              <div className="locations-hero__visual" aria-hidden="true">
                <div className="locations-hero__orb locations-hero__orb--one" />
                <div className="locations-hero__orb locations-hero__orb--two" />
                <ProjectIllustration variant="availability" />
              </div>
            </section>

            <div className="parking-3d-panel">
              <div className="panel-header">
                <div>
                  <p className="section-label">3D parking deck</p>
                  <h2>Tap a slot to simulate booking</h2>
                </div>
              </div>

              <div className="parking-3d-panel__meta" aria-label="Parking deck details">
                <span className="parking-3d-panel__chip is-live">Live deck</span>
                <span className="parking-3d-panel__chip">8 interactive slots</span>
                <span className="parking-3d-panel__chip">Hover for motion</span>
              </div>

              <div className="parking-canvas-shell" aria-label="Interactive parking slots" role="img">
                <Canvas
                  className="parking-canvas"
                  dpr={[1, 1.5]}
                  camera={{ position: [0, 5.4, 8.2], fov: 38 }}
                  gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                  shadows
                  frameloop="always"
                >
                  <ParkingLotScene />
                </Canvas>
              </div>

              <p className="panel-copy parking-copy">
                Green slots are available, red slots are occupied, and clicks toggle booking state instantly.
              </p>
            </div>

            <div className="panel-header">
              <div>
                <p className="section-label">Inventory</p>
                <h2>Parking locations</h2>
              </div>
              <button className="ghost-button" type="button" onClick={loadLocations}>
                Refresh
              </button>
            </div>

            <div className="filter-row" role="tablist" aria-label="Location filters">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={filter === activeFilter ? 'filter-chip active' : 'filter-chip'}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="location-search-row">
              <label className="location-search" htmlFor="location-search-input">
                <span>Search parking location</span>
                <input
                  id="location-search-input"
                  type="search"
                  value={locationSearchQuery}
                  onChange={(event) => setLocationSearchQuery(event.target.value)}
                  placeholder="Search by lot name, city, or description"
                />
              </label>

              {locationSearchQuery ? (
                <button type="button" className="ghost-button location-search-clear" onClick={() => setLocationSearchQuery('')}>
                  Clear
                </button>
              ) : null}
            </div>

            {status.message ? <p className="status-line">{status.message}</p> : null}
            {status.loading ? <p className="status-line">Loading locations...</p> : null}

            {status.loading ? (
              <div className="location-list location-list--loading" aria-live="polite" aria-busy="true">
                {[0, 1, 2].map((index) => (
                  <section className="location-card location-card--skeleton" key={`location-skeleton-${index}`} aria-hidden="true">
                    <div className="location-skeleton-line location-skeleton-line--title" />
                    <div className="location-skeleton-line location-skeleton-line--meta" />
                    <div className="location-skeleton-line" />
                    <div className="location-skeleton-line" />
                    <div className="location-skeleton-line location-skeleton-line--button" />
                  </section>
                ))}
              </div>
            ) : (
              <div className="location-list">
                {visibleLocations.map((location, index) => (
                  <section
                    className="location-card"
                    key={location.id}
                    style={{
                      '--card-index': index,
                      '--card-accent': location.transitAccess ? 'rgba(54, 211, 153, 0.95)' : 'rgba(246, 193, 101, 0.95)',
                    }}
                  >
                    <div className="location-card__rail" aria-hidden="true" />
                    <div className="location-card__top">
                      <div>
                        <h3>{location.name}</h3>
                        <p>{location.city}</p>
                      </div>
                      <div className="location-card__price-group">
                        <div className="price-pill">${location.pricePerDay}/day</div>
                        <div className={location.transitAccess ? 'location-card__badge is-transit' : 'location-card__badge'}>
                          {location.transitAccess ? 'Transit access' : 'Shuttle access'}
                        </div>
                      </div>
                    </div>

                    <p className="location-copy">{location.description}</p>

                    <div className="location-meta">
                      <span>{location.availableSpots} open</span>
                      <span>{location.capacity} total</span>
                      <span>{location.transitAccess ? 'Transit ready' : 'Shuttle access only'}</span>
                    </div>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => openReservationModal(location)}
                      disabled={location.availableSpots <= 0}
                    >
                      {location.availableSpots > 0 ? 'Reserve a spot' : 'Fully booked'}
                    </button>
                  </section>
                ))}

                {visibleLocations.length === 0 ? (
                  <section className="empty-state-card" aria-live="polite">
                    <h3>No lots match this filter yet.</h3>
                    <p>Try a wider filter or update search text to find nearby commuter lots with open Park and Ride spaces.</p>
                    <div className="empty-state-card__actions">
                      <button type="button" className="ghost-button" onClick={() => setActiveFilter('All')}>
                        Show all lots
                      </button>
                      <button type="button" className="primary-button" onClick={() => setActiveFilter('Transit access')}>
                        Transit-ready lots
                      </button>
                    </div>
                  </section>
                ) : null}
              </div>
            )}
          </article>
        </section>
      </main>
    );
  }

  function renderAddLocationPage() {
    return (
      <main className="page-shell app-main">
        <section className="content-grid content-grid--single">
          <aside className="panel form-panel" id="add-location">
            <section className="add-location-hero">
              <div className="add-location-hero__copy">
                <p className="section-label">Operations</p>
                <h2>Add a location with a cleaner, more guided workflow.</h2>
                <p className="panel-copy">
                  Create new commuter inventory, define transit access, and publish it with a form that feels more like a
                  product launch than a database entry screen.
                </p>

                <div className="add-location-hero__chips">
                  <span>Fast setup</span>
                  <span>Transit-ready</span>
                  <span>Live in the dashboard</span>
                </div>

                <div className="add-location-hero__stats" aria-label="Form benefits">
                  <div>
                    <strong>1</strong>
                    <span>Form, publish, done</span>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <span>Always visible to riders</span>
                  </div>
                  <div>
                    <strong>MERN</strong>
                    <span>Stored through the API</span>
                  </div>
                </div>
              </div>

              <div className="add-location-hero__visual" aria-hidden="true">
                <div className="add-location-hero__halo add-location-hero__halo--one" />
                <div className="add-location-hero__halo add-location-hero__halo--two" />
                <ProjectIllustration variant="premium" />
              </div>
            </section>

            <div className="add-location-layout">
              <form className="location-form add-location-form" onSubmit={handleSubmit}>
                <div className="form-field-banner">
                  <span className="form-field-banner__dot" />
                  <p>New lot details</p>
                </div>

                <label>
                  Name
                  <input
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="North Station Lot"
                    required
                  />
                </label>
                <label>
                  City
                  <input
                    value={form.city}
                    onChange={(event) => setForm({ ...form, city: event.target.value })}
                    placeholder="Seattle"
                    required
                  />
                </label>
                <div className="two-column">
                  <label>
                    Price per day
                    <input
                      type="number"
                      min="0"
                      value={form.pricePerDay}
                      onChange={(event) => setForm({ ...form, pricePerDay: event.target.value })}
                      placeholder="12"
                      required
                    />
                  </label>
                  <label>
                    Capacity
                    <input
                      type="number"
                      min="1"
                      value={form.capacity}
                      onChange={(event) => setForm({ ...form, capacity: event.target.value })}
                      placeholder="120"
                      required
                    />
                  </label>
                </div>
                <label>
                  Available spots
                  <input
                    type="number"
                    min="0"
                    value={form.availableSpots}
                    onChange={(event) => setForm({ ...form, availableSpots: event.target.value })}
                    placeholder="40"
                  />
                </label>
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={form.transitAccess}
                    onChange={(event) => setForm({ ...form, transitAccess: event.target.checked })}
                  />
                  Transit access available
                </label>
                <label>
                  Description
                  <textarea
                    value={form.description}
                    onChange={(event) => setForm({ ...form, description: event.target.value })}
                    placeholder="Short note for commuters and operators"
                    rows="4"
                    required
                  />
                </label>
                <button className="primary-button" type="submit">
                  Add location
                </button>
              </form>

              <aside className="add-location-preview">
                <p className="section-label">Preview</p>
                <h3>How it will appear to riders</h3>
                <div className="add-location-preview__card">
                  <div className="add-location-preview__top">
                    <div>
                      <strong>{form.name || 'North Station Lot'}</strong>
                      <span>{form.city || 'Seattle'}</span>
                    </div>
                    <div className="price-pill">${form.pricePerDay || '12'}/day</div>
                  </div>
                  <p>{form.description || 'Short note for commuters and operators'}</p>
                  <div className="location-meta">
                    <span>{form.availableSpots || '40'} open</span>
                    <span>{form.capacity || '120'} total</span>
                    <span>{form.transitAccess ? 'Transit ready' : 'Shuttle access only'}</span>
                  </div>
                </div>

                <div className="add-location-preview__steps">
                  <div>
                    <span>01</span>
                    <p>Fill in the lot data</p>
                  </div>
                  <div>
                    <span>02</span>
                    <p>Publish through Express</p>
                  </div>
                  <div>
                    <span>03</span>
                    <p>It appears in Locations instantly</p>
                  </div>
                </div>
              </aside>
            </div>
          </aside>
        </section>
      </main>
    );
  }

  function renderSupportPage() {
    return (
      <main className="page-shell app-main">
        <section className="panel support-panel support-panel--standalone">
          <div className="support-hero">
            <div className="support-hero__copy">
              <p className="section-label">Support center</p>
              <h2>Help, guidance, and quick contact options</h2>
              <p className="panel-copy">
                A cleaner support hub for fast answers, direct contact, and product guidance. It is designed to feel calm,
                premium, and easy to scan.
              </p>

              <div className="support-hero__pills">
                <span>Fast answers</span>
                <span>Booking help</span>
                <span>Inventory support</span>
              </div>

              <div className="support-hero__steps">
                <div>
                  <strong>1</strong>
                  <p>Choose the help path</p>
                </div>
                <div>
                  <strong>2</strong>
                  <p>Open chat, email, or docs</p>
                </div>
                <div>
                  <strong>3</strong>
                  <p>Resolve and get back to work</p>
                </div>
              </div>
            </div>
            <div className="support-hero__visual">
              <div className="support-contact-card">
                <p className="support-contact-label">Need direct help?</p>
                <div className="support-contact-line">
                  <span>Email</span>
                  <strong>support@parkandride.app</strong>
                </div>
                <div className="support-contact-line">
                  <span>Hours</span>
                  <strong>Mon - Fri, 8:00 AM - 6:00 PM</strong>
                </div>
              </div>

              <div className="support-hero__art" aria-hidden="true">
                <div className="support-hero__glow support-hero__glow--one" />
                <div className="support-hero__glow support-hero__glow--two" />
                <ProjectIllustration variant="transit" />
              </div>
            </div>
          </div>

          <div className="support-metrics-grid">
            {supportMetrics.map((metric) => (
              <article className="support-metric-card" key={metric.label}>
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </article>
            ))}
          </div>

          <div className="support-actions-grid">
            {supportQuickActions.map((item) => (
              <article className="support-action-card" key={item.title}>
                <div className="support-action-icon" aria-hidden="true">
                  {item.icon === 'chat' ? (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 5.5C4 4.67157 4.67157 4 5.5 4H18.5C19.3284 4 20 4.67157 20 5.5V14.5C20 15.3284 19.3284 16 18.5 16H10L6 20V16H5.5C4.67157 16 4 15.3284 4 14.5V5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M8 9.5H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M8 12.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  ) : item.icon === 'email' ? (
                    <svg viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M6.5 8L12 12.5L17.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M5 6.5C5 5.67157 5.67157 5 6.5 5H17.5C18.3284 5 19 5.67157 19 6.5V17.5C19 18.3284 18.3284 19 17.5 19H6.5C5.67157 19 5 18.3284 5 17.5V6.5Z" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8 9H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M8 12H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M8 15H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button type="button" className="support-action-button" onClick={() => openSupportModal(item.action)}>
                  Open
                </button>
              </article>
            ))}
          </div>

          <div className="support-faq-grid">
            <article className="support-faq-panel">
              <p className="section-label">Frequently asked</p>
              <div className="support-faq-list">
                {supportFaq.map((item) => (
                  <div className="support-faq-item" key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="support-info-panel">
              <p className="section-label">Helpful paths</p>
              <div className="support-grid">
                {supportItems.map((item) => (
                  <article key={item.title}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>
      </main>
    );
  }

  function renderPaymentPage() {
    return (
      <main className="page-shell app-main">
        <section className="panel payment-shell">
          {!pendingPayment ? (
            <section className="payment-empty" aria-live="polite">
              <p className="section-label">Payment</p>
              <h2>No active checkout found.</h2>
              <p className="panel-copy">Start from Locations and click Reserve a spot to continue to payment.</p>
              <button className="primary-button" type="button" onClick={() => setCurrentPage('locations')}>
                Back to locations
              </button>
            </section>
          ) : (
            <section className="payment-layout" aria-label="Payment checkout">
              <article className="payment-main-card">
                <p className="section-label">Razorpay-style checkout</p>
                <h2>Complete your secure payment</h2>
                <p className="panel-copy">Review your booking and continue to pay for your daily parking pass.</p>

                <div className="payment-method-stack" role="list" aria-label="Available methods">
                  <button type="button" className={pendingPayment.customer.paymentMethod === 'Card' ? 'payment-method-chip is-active' : 'payment-method-chip'}>
                    Card
                  </button>
                  <button type="button" className={pendingPayment.customer.paymentMethod === 'UPI' ? 'payment-method-chip is-active' : 'payment-method-chip'}>
                    UPI
                  </button>
                  <button
                    type="button"
                    className={pendingPayment.customer.paymentMethod === 'Net Banking' ? 'payment-method-chip is-active' : 'payment-method-chip'}
                  >
                    Net Banking
                  </button>
                </div>

                <div className="payment-actions-row">
                  <button className="ghost-button" type="button" onClick={() => setCurrentPage('locations')} disabled={isProcessingPayment}>
                    Cancel payment
                  </button>
                  <button className="primary-button" type="button" onClick={handleConfirmPayment} disabled={isProcessingPayment}>
                    {isProcessingPayment ? 'Processing payment...' : `Pay $${pendingPayment.amount}`}
                  </button>
                </div>
              </article>

              <aside className="payment-summary-card">
                <p className="section-label">Booking summary</p>
                <h3>{pendingPayment.location.name}</h3>
                <p>{pendingPayment.location.city}</p>

                <div className="payment-summary-grid">
                  <div>
                    <span>Amount</span>
                    <strong>${pendingPayment.amount}</strong>
                  </div>
                  <div>
                    <span>Payment mode</span>
                    <strong>{paymentMethodLabels[pendingPayment.customer.paymentMethod]}</strong>
                  </div>
                  <div>
                    <span>Vehicle no.</span>
                    <strong>{pendingPayment.customer.vehicleNumber}</strong>
                  </div>
                  <div>
                    <span>Vehicle model</span>
                    <strong>{pendingPayment.customer.vehicleModel}</strong>
                  </div>
                  <div>
                    <span>License</span>
                    <strong>{pendingPayment.customer.licenseNumber}</strong>
                  </div>
                  <div>
                    <span>Booked by</span>
                    <strong>{pendingPayment.customer.fullName}</strong>
                  </div>
                </div>
              </aside>
            </section>
          )}
        </section>
      </main>
    );
  }

  function renderSupportModal() {
    if (!supportModal) {
      return null;
    }

    const modalContent = {
      chat: {
        title: 'Chat for Park and Ride booking support',
        description: 'Share your lot, city, and booking issue to get guided help for reservation or commuter access problems.',
        label: 'Live chat hours',
        value: 'Mon - Fri, 8:00 AM - 6:00 PM',
      },
      email: {
        title: 'Email lot operations support',
        description: 'Send lot updates, pricing corrections, or rider issue details and include the lot name and route context.',
        label: 'Operations inbox',
        value: 'support@parkandride.app',
      },
      docs: {
        title: 'Open Park and Ride documentation',
        description: 'Review rider booking flow, lot filtering rules, and standards for publishing new commuter locations.',
        label: 'Docs coverage',
        value: 'Booking flow, lot setup, filter logic, support paths',
      },
    }[supportModal];

    return (
      <div className="support-modal-overlay" role="presentation" onClick={closeSupportModal}>
        <div className="support-modal" role="dialog" aria-modal="true" aria-labelledby="support-modal-title" onClick={(event) => event.stopPropagation()}>
          <button className="support-modal-close" type="button" aria-label="Close support dialog" onClick={closeSupportModal}>
            ×
          </button>

          <p className="section-label">Support action</p>
          <h3 id="support-modal-title">{modalContent.title}</h3>
          <p className="support-modal-copy">{modalContent.description}</p>

          <div className="support-modal-meta">
            <span>{modalContent.label}</span>
            <strong>{modalContent.value}</strong>
          </div>

          <form className="support-modal-form" onSubmit={(event) => event.preventDefault()}>
            <div className="two-column">
              <label>
                Name
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" placeholder="you@example.com" />
              </label>
            </div>
            <label>
              Message
              <textarea rows="4" placeholder="Describe your issue or question" />
            </label>
            <div className="support-modal-actions">
              <button className="ghost-button" type="button" onClick={closeSupportModal}>
                Cancel
              </button>
              <button className="primary-button" type="submit">
                Send request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function renderReservationModal() {
    if (!reservationModal) {
      return null;
    }

    return (
      <div className="reserve-modal-overlay" role="presentation" onClick={closeReservationModal}>
        <div className="reserve-modal" role="dialog" aria-modal="true" aria-labelledby="reserve-modal-title" onClick={(event) => event.stopPropagation()}>
          <button className="reserve-modal-close" type="button" aria-label="Close reservation dialog" onClick={closeReservationModal}>
            ×
          </button>

          <p className="section-label">Reservation checkout</p>
          <h3 id="reserve-modal-title">Reserve your spot at {reservationModal.name}</h3>
          <p className="reserve-modal-copy">
            Complete payment and vehicle details to confirm your booking in {reservationModal.city}.
          </p>

          <div className="reserve-modal-meta">
            <div>
              <span>Daily rate</span>
              <strong>${reservationModal.pricePerDay}/day</strong>
            </div>
            <div>
              <span>Current availability</span>
              <strong>{reservationModal.availableSpots} open</strong>
            </div>
            <div>
              <span>Access type</span>
              <strong>{reservationModal.transitAccess ? 'Transit access' : 'Shuttle access'}</strong>
            </div>
          </div>

          <form className="reserve-modal-form" onSubmit={handleReservationSubmit}>
            <div className="two-column">
              <label>
                Full name
                <input
                  type="text"
                  value={reservationForm.fullName}
                  onChange={(event) => setReservationForm({ ...reservationForm, fullName: event.target.value })}
                  placeholder="Driver name"
                  required
                />
              </label>
              <label>
                Payment method
                <select
                  value={reservationForm.paymentMethod}
                  onChange={(event) => setReservationForm({ ...reservationForm, paymentMethod: event.target.value })}
                  required
                >
                  <option value="Card">Card</option>
                  <option value="UPI">UPI</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </label>
            </div>

            <div className="two-column">
              <label>
                Car number
                <input
                  type="text"
                  value={reservationForm.vehicleNumber}
                  onChange={(event) => setReservationForm({ ...reservationForm, vehicleNumber: event.target.value.toUpperCase() })}
                  placeholder="KA01AB1234"
                  required
                />
              </label>
              <label>
                Car model
                <input
                  type="text"
                  value={reservationForm.vehicleModel}
                  onChange={(event) => setReservationForm({ ...reservationForm, vehicleModel: event.target.value })}
                  placeholder="Honda City"
                  required
                />
              </label>
            </div>

            <label>
              Driving license number
              <input
                type="text"
                value={reservationForm.licenseNumber}
                onChange={(event) => setReservationForm({ ...reservationForm, licenseNumber: event.target.value.toUpperCase() })}
                placeholder="DL-0420110149646"
                required
              />
            </label>

            <div className="reserve-modal-actions">
              <button className="ghost-button" type="button" onClick={closeReservationModal} disabled={isSubmittingReservation}>
                Cancel
              </button>
              <button className="primary-button" type="submit" disabled={isSubmittingReservation}>
                {isSubmittingReservation ? 'Processing...' : 'Pay and confirm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function renderCurrentPage() {
    if (currentPage === 'login') {
      return <Login onSwitchPage={handleNavigation} />;
    }

    if (currentPage === 'signup') {
      return <Signup onSwitchPage={handleNavigation} />;
    }

    if (currentPage === 'locations') {
      return renderLocationsPage();
    }

    if (currentPage === 'add-location') {
      return renderAddLocationPage();
    }

    if (currentPage === 'support') {
      return renderSupportPage();
    }

    if (currentPage === 'payment') {
      return renderPaymentPage();
    }

    return renderOverviewPage();
  }

  return (
    <>
      <header className="site-header">
        <div className="page-shell site-header__inner">
          {renderBrand()}
          {renderNav()}
          {renderHeaderActions()}
        </div>
      </header>

      {renderCurrentPage()}
      {renderReservationModal()}
      {renderSupportModal()}

      {toast ? (
        <div className={`app-toast app-toast--${toast.kind}`} role="status" aria-live="polite" key={toast.key}>
          <span>{toast.message}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}>
            ×
          </button>
        </div>
      ) : null}

      <footer className="site-footer">
        <div className="page-shell site-footer__inner">
          <div className="site-footer__brand-block">
            <p className="site-footer__brand">Park and Ride</p>
            <p className="site-footer__tag">Commuter lot discovery, reservation, and transit-ready planning.</p>
          </div>

          <div className="site-footer__link-group" aria-label="Footer quick links">
            <button type="button" className="site-footer__link-button" onClick={() => handleNavigation('overview')}>
              Overview
            </button>
            <button type="button" className="site-footer__link-button" onClick={() => handleNavigation('locations')}>
              Locations
            </button>
            <button type="button" className="site-footer__link-button" onClick={() => handleNavigation('add-location')}>
              Add location
            </button>
            <button type="button" className="site-footer__link-button" onClick={() => handleNavigation('support')}>
              Support
            </button>
            <button type="button" className="site-footer__top-button" onClick={handleBackToTop}>
              Back to top
            </button>
          </div>

          <div className="site-footer__meta-block">
            <p>support@parkandride.app</p>
            <p>Mon - Fri, 8:00 AM - 6:00 PM</p>
            <p>Lot data updates on refresh and booking actions.</p>
            <p>Built with MongoDB, Express, React, and Node.js.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

