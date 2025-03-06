const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-4 mt-10 fixed bottom-0 w-full">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
          <p className="text-sm">
            Made with ❤️ by <a href="https://yourwebsite.com" className="underline">Y Samanvith reddy</a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  