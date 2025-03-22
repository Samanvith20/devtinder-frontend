import React from 'react';

const Subscription = () => {

    const createorder=async(plan)=>{
        try {
            const response = await fetch(`http://localhost:3000/api/payment/create-order`, {
              method: "POST",
              credentials:"include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ membershipType: plan }),
            });
            const data = await response.json();
            console.log("Order Data",data)
            if(!response.ok){
              throw new Error(data.message || "Error  occured while creating order")
            }
            const{ amount, notes, currency,  orderId}=data.data
            const options = {
                key: data.keyId,
                amount: amount,
                currency: currency,
                name: "Devtinder",
                description: "Subscription",
                image: "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
                order_id: orderId,
                prefill: {
                    name: notes.firstName + " " + notes.lastName,
                    email: notes.emailId,
                    contact: "9999999999",
                  },
                theme: {
                    color: "#F37254",
                  },
                
            }
            const rzp = new window.Razorpay(options);
    rzp.open();
          } catch (error) {
            console.log("Error",error)
            
          }
        
    }
    return (
        <div className="bg-gray-100 py-24 ">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Subscription Plans</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Gold Plan</h2>
                        <p className="text-gray-700 mb-4">Details about what's included in the Gold Plan:</p>
                        <ul className="text-gray-700 mb-4">
                            <li>Connect with each other</li>
                            <li>Chat with a limit of 20 people per day</li>
                        </ul>
                        <p className="text-gray-700 mb-4">Pricing: $500 per month</p>
                        <button 
                        onClick={()=>{
                            createorder("gold")
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pay Now</button>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Premium Plan</h2>
                        <p className="text-gray-700 mb-4">Details about what's included in the Premium Plan:</p>
                        <ul className="text-gray-700 mb-4">
                            <li>Send unlimited connection requests</li>
                            <li>Chat with unlimited members</li>
                            <li>Video-call feature is also available</li>
                        </ul>
                        <p className="text-gray-700 mb-4">Pricing: $700 per month</p>
                        <button
                        onClick={()=>{
                            createorder("premium")
                        }}
                         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pay Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Subscription;
