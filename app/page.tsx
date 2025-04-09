import Link from "next/link"
import { PlusCircle, TruckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadsTable } from "@/components/loads-table"
import { DashboardStats } from "@/components/dashboard-stats"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <TruckIcon className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-semibold tracking-tight">ForestFreight TMS</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground">
              Dashboard
            </Link>
            <Link href="/loads" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Loads
            </Link>
            <Link href="/carriers" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Carriers
            </Link>
            <Link href="/customers" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Customers
            </Link>
            <Link href="/reports" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Reports
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Settings
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 neon-glow">
              Profile
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gradient-to-b from-emerald-50 to-white animated-gradient-bg">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <Link href="/loads/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700 neon-glow">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Load
              </Button>
            </Link>
          </div>

          <DashboardStats />

          <Tabs defaultValue="active" className="mt-6">
            <TabsList className="bg-emerald-50">
              <TabsTrigger value="active">Active Loads</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="all">All Loads</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <Card className="gradient-border">
                <CardHeader>
                  <CardTitle>Active Loads</CardTitle>
                  <CardDescription>Manage your active loads that are currently in transit.</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoadsTable status="active" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Export</Button>
                  <Link href="/loads?status=active">
                    <Button variant="ghost">View All Active Loads</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <Card className="gradient-border">
                <CardHeader>
                  <CardTitle>Pending Loads</CardTitle>
                  <CardDescription>Loads that are scheduled but not yet picked up.</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoadsTable status="pending" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Export</Button>
                  <Link href="/loads?status=pending">
                    <Button variant="ghost">View All Pending Loads</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="delivered" className="mt-4">
              <Card className="gradient-border">
                <CardHeader>
                  <CardTitle>Delivered Loads</CardTitle>
                  <CardDescription>Loads that have been successfully delivered.</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoadsTable status="delivered" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Export</Button>
                  <Link href="/loads?status=delivered">
                    <Button variant="ghost">View All Delivered Loads</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="all" className="mt-4">
              <Card className="gradient-border">
                <CardHeader>
                  <CardTitle>All Loads</CardTitle>
                  <CardDescription>View and manage all loads in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                  <LoadsTable status="all" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Export</Button>
                  <Link href="/loads">
                    <Button variant="ghost">View All Loads</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex h-14 items-center justify-between">
          <p className="text-sm text-muted-foreground">© 2025 ForestFreight TMS. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
