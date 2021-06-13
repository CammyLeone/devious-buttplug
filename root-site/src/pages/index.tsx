import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Landing from '../sections/Landing';
import WhatItIs from '../sections/WhatItIs';
import Projects from '../sections/Projects';
import Footer from '../components/Footer';

const IndexPage = () => (
  <Layout>
    <Header />
    <Landing />
    <WhatItIs />
    <Projects />
    <Footer />
  </Layout>
);

export default IndexPage;
