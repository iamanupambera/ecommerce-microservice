import { lazy } from 'react';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Categories from './Categories';
const IndexHeader = lazy(() => import('../../shared/header/components/Header'));
const GigTabs = lazy(() => import('./gig-tabs/GigTabs'));

export default function Index() {
  return (
    <div className="flex flex-col">
      <IndexHeader navClass="navbar peer-checked:navbar-active fixed z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      <Hero />
      <GigTabs />
      <HowItWorks />
      <Categories/>
    </div>
  );
}
