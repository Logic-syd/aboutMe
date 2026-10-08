import Link from 'next/link';
import { Header, Footer } from '@/components/site';
export default function NotFound() { return <div id="top"><Header detail /><main id="main" className="shell not-found"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>A little off the map.</h1><p>This page doesn’t exist. Let’s get you back to the work.</p><Link className="button" href="/">Back to home ↗</Link></main><Footer /></div>; }
