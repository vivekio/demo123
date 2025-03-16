import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-gray-600 mt-2">
              We provide the best products at the most competitive prices with excellent customer service.
            </p>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping Policy</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Store Locations</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-gray-600 mt-2">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t mt-8 pt-4 text-center text-gray-600 text-sm">
          &copy; 2024 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
