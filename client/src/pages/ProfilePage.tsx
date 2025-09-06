import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { User, Package, MapPin, Settings, LogOut } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useNavigate } from 'react-router-dom'
import { apiClient } from '@/lib/apiClient'
import toast from 'react-hot-toast'

interface UserProfileType {
  name: string,
  email: string,
  picture: string,
  joinDate: string
}

const ProfilePage: React.FC = () => {
  const [mockUser, setMockUser] = useState<UserProfileType | null>(null);

  // const mockUser = {
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  //   picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  //   joinDate: 'January 2023'
  // }

  const navigate = useNavigate();

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2023-12-15',
      status: 'Delivered',
      total: 299.99,
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2023-12-10',
      status: 'Shipped',
      total: 156.50,
      items: 1
    }
  ]


  const onLogOut = () => {
    localStorage.clear();
    window.location.href = "/";
  }

  const handelProfileData = async () => {
    try {
      const res = await apiClient("/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`
        }
      })

      if (res.status === 200) {
        const usr = res.data.user;
        const dateStr = new Date(usr.createdAt);
        const joinDate = dateStr.toLocaleDateString("en-US", {month : 'long', year : "numeric" });
        setMockUser({
          name : usr.name,
          email : usr.email,
          picture : usr.picture,
          joinDate : joinDate
        });
        console.log({usr})
      }
    } catch (err) {
      toast.error("Error");
      navigate("/login");
    }
  }

  useEffect(() => {
    handelProfileData();
  }, [])

  return (
    <>
      <Helmet>
        <title>My Profile - Modulive</title>
      </Helmet>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            My Profile
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                {mockUser && <div className="text-center mb-6">
                  <img
                    src={mockUser.picture}
                    alt={mockUser.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {mockUser.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{mockUser.email}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Member since {mockUser.joinDate}
                  </p>
                </div>}

                <nav className="space-y-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                    <Package className="h-5 w-5" />
                    <span>Orders</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-5 w-5" />
                    <span>Addresses</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                  <button onClick={onLogOut} className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Orders */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Recent Orders
                </h3>

                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Order {order.id}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.date} • {order.items} items
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          ${order.total}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                          }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </motion.div>

              {/* Account Settings */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Account Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receive updates about your orders
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Password
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last updated 3 months ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
