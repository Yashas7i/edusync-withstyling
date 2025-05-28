import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-slate-600 dark:text-slate-400">
        © {new Date().getFullYear()} EduSync LMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
