
const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      <img
        src="/404-image.jpg" // Replace with your custom 404 image URL
        alt="Page Not Found"
        className="max-w-md mt-0 w-full"
      />
      <a
        href="/login"
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded-md text-lg hover:bg-blue-600 transition duration-300"
      >
        Go to Login
      </a>
    </div>
  );
};

export default NotFound;
