export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DatatoRAG. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
