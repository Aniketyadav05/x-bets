const testimonials = [
    { name: "John Doe", feedback: "Great platform! I love trading here!" },
    { name: "Jane Smith", feedback: "Amazing experience and support." },
    { name: "Sam Wilson", feedback: "I made profits consistently!" },
  ];
  
  return (
    <div className="my-20 text-center">
      <h2 className="text-3xl text-white mb-6">What Our Users Say</h2>
      <div className="flex justify-center space-x-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-[#1F4172] p-4 rounded-lg shadow-lg text-white">
            <p className="italic">"{testimonial.feedback}"</p>
            <h4 className="font-bold mt-2">{testimonial.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
  