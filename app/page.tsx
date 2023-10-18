import Cart from '@/components/cart/Cart';
import Header from '@/components/header/Header';
import OverviewCategories from '@/components/overview-categories/OverviewCategories';
import OverviewCTA from '@/components/overview-cta/OverviewCTA';
import OverviewFavorites from '@/components/overview-favorites/OverviewFavorites';
import OverviewFeatured from '@/components/overview-featured/OverviewFeatured';
import OverviewFooter from '@/components/overview-footer/OverviewFooter';
import OverviewGetStarted from '@/components/overview-get-started/OverviewGetStarted';
import LatestProduct from '@/components/product/LatestProduct';

export default function Home() {
  return (
    <div className='bg-white'>
      <Cart />

      <Header />

      {/* Latest Products section */}
      <LatestProduct />

      {/* Category section */}
      <OverviewCategories />

      <main>
        {/* Get Started section */}
        <OverviewGetStarted />

        {/* Featured section */}
        <OverviewFeatured />

        {/* Favorites section */}
        <OverviewFavorites />

        {/* CTA section */}
        <OverviewCTA />
      </main>

      <footer aria-labelledby='footer-heading' className='bg-white'>
        <OverviewFooter />
      </footer>
    </div>
  );
}
