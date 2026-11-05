const lessons = [
  {
    "id": "workspace",
    "title": "Clone the starting checkpoint",
    "time": "8 min",
    "intro": "Get the starter project onto your computer and create your own branch to save your work.",
    "parts": [
      {
        "type": "text",
        "title": "Choose the starting version",
        "text": "The <a href=\"https://github.com/john-dempsey/book-reviews-student/tree/lesson-01-topic-01\">starting tag</a> contains Laravel 12, the Docker configuration and one route for the welcome page. A tag names a particular version of the files. You can browse <a href=\"https://github.com/john-dempsey/book-reviews-student/tree/main\">the finished application</a> to see where the course leads."
      },
      {
        "type": "text",
        "title": "Open a terminal on your computer",
        "text": "You will need Git, Docker Desktop and a code editor. Start Docker Desktop and wait for the engine to be ready. In your terminal, move to the folder where you usually keep your projects."
      },
      {
        "type": "code",
        "file": "Terminal · your computer",
        "label": "Clone the tag, then enter the new folder",
        "text": "git clone -c core.autocrlf=input --branch lesson-01-topic-01 https://github.com/john-dempsey/book-reviews-student.git book-reviews-learning\ncd book-reviews-learning"
      },
      {
        "type": "text",
        "title": "Make the checkpoint your own",
        "text": "Git may report a “detached HEAD” after cloning a tag. Create a branch now so your commits have a name. The clone command sets line endings for this project, which keeps the Docker shell script usable on Windows."
      },
      {
        "type": "code",
        "file": "Terminal · book-reviews-learning",
        "label": "Create your working branch and check its starting point",
        "text": "git switch -c my-book-reviews\ngit branch --show-current\ngit describe --tags --exact-match HEAD"
      },
      {
        "type": "check",
        "text": "The last two commands print my-book-reviews and lesson-01-topic-01, respectively. Open book-reviews-learning in your editor. You should see README.md, compose.yaml, docker/ and src/."
      },
      {
        "type": "help",
        "text": "If Git says the destination already exists, use a new folder name in the clone and cd commands. If you already completed this step, return to your existing working folder and run git status to see your current branch."
      }
    ],
    "q": "Why create my-book-reviews after cloning the tag?",
    "options": [
      "To keep your own commits on a named branch",
      "To start the Docker containers",
      "To install Laravel Breeze"
    ],
    "answer": 0,
    "feedback": "The tag identifies the shared starting point. Your branch moves forward as you commit your work."
  },
  {
    "id": "install",
    "title": "Start the Docker workspace",
    "time": "12 min",
    "intro": "Start the Docker containers and open the workspace where you will run Laravel commands.",
    "parts": [
      {
        "type": "text",
        "title": "Open the README in your editor",
        "text": "Find <strong>Docker Setup</strong> and <strong>First-time setup</strong>. These are the instructions for the version you just cloned. You can also <a href=\"https://github.com/john-dempsey/book-reviews-student/blob/lesson-01-topic-01/README.md\">read the tagged README on GitHub</a>. Open <code>compose.yaml</code> alongside it."
      },
      {
        "type": "code",
        "file": "Terminal · book-reviews-learning",
        "label": "Build and start the services, then inspect their status",
        "text": "docker compose up -d --build\ndocker compose ps"
      },
      {
        "type": "text",
        "title": "Read the service names",
        "text": "Look for <code>apache-php-container</code>, which serves your app on port 8080, and <code>mysql-container</code>, which stores its data. <code>phpmyadmin-container</code> gives you a browser view of that database on port 8081. The fourth service, <code>workspace-container</code>, gives you PHP, Composer and npm in a terminal. The first build can take several minutes."
      },
      {
        "type": "code",
        "file": "Terminal · book-reviews-learning",
        "label": "Enter the running workspace",
        "text": "docker compose exec workspace-container bash"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "label": "See where your commands will run",
        "text": "pwd\nls"
      },
      {
        "type": "check",
        "text": "pwd prints /var/www/html and ls includes artisan and composer.json. Compare this listing with src/ in your editor. Docker mounts that folder into the container, so both views refer to the same files. Leave this shell open for the next step."
      },
      {
        "type": "help",
        "text": "If Compose cannot find a configuration file, check that your host terminal is in book-reviews-learning beside compose.yaml. If a port or container name is already in use, stop the conflicting local project and run the start command again."
      }
    ],
    "q": "Where should you run composer install for this project?",
    "options": [
      "In the MySQL service",
      "In the workspace shell at /var/www/html",
      "In phpMyAdmin"
    ],
    "answer": 1,
    "feedback": "The workspace supplies Composer and opens in the mounted Laravel project, beside composer.json."
  },
  {
    "id": "database",
    "title": "Run the starter application",
    "time": "10 min",
    "intro": "Install the packages, set up the database and check that Laravel opens in your browser.",
    "parts": [
      {
        "type": "text",
        "title": "Install the project dependencies",
        "text": "You now have the Docker workspace running. Next, install the PHP dependencies that the application needs. Run the commands below <strong>inside the workspace-container shell</strong> opened in the previous activity. Composer reads <code>composer.lock</code> and installs the required PHP packages into <code>vendor/</code>."
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "label": "Install the locked PHP dependencies",
        "text": "composer install"
      },
      {
        "type": "text",
        "title": "Build the browser assets",
        "text": "npm installs the JavaScript packages. The build command then runs Vite to prepare the CSS and JavaScript that the browser uses."
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "label": "Install and build the frontend assets",
        "text": "npm install --ignore-scripts && npm run build"
      },
      {
        "type": "text",
        "title": "Prepare the database",
        "text": "<p>Laravel uses <strong>migrations</strong> to create and update database tables. A migration is a PHP file that describes a change to the database structure, such as creating a table or adding a column. Keeping these instructions in the project means everyone can build the same database structure without creating tables manually in phpMyAdmin.</p><p>The starting project includes migrations for Laravel's <code>users</code>, <code>cache</code> and <code>jobs</code> tables. The command below runs any migrations that have not already been applied. Laravel records which ones have run, so running it again does not recreate the same tables. <code>migrate:status</code> shows you which migrations have been completed.</p><p>The project includes database connection settings in its <code>.env</code> files. Leave those settings as supplied.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "label": "Apply the migrations and inspect their status",
        "text": "php artisan migrate\nphp artisan migrate:status"
      },
      {
        "type": "check",
        "text": "Open <code>http://localhost:8080</code> in your browser. You should see Laravel’s default welcome page. Next, open <code>http://localhost:8081</code> (phpMyAdmin), select the <code>book_reviews</code> database and find the <code>users</code>, <code>cache</code> and <code>jobs</code> tables. In the terminal, <code>php artisan migrate:status</code> should show these migrations as <strong>Ran</strong>. You will create the catalogue tables later."
      },
      {
        "type": "text",
        "title": "Find the page you just opened",
        "text": "In your editor, open <code>src/routes/web.php</code>. The route for <code>/</code> returns <code>view('welcome')</code>, which renders <code>src/resources/views/welcome.blade.php</code>. You have now seen the connection between a URL, a Laravel route and the page displayed in the browser. In the next activity, you will add your own route."
      },
      {
        "type": "help",
        "text": "If php artisan migrate reports a connection error on first launch, allow MySQL to finish starting and retry. For an access-denied error, see the troubleshooting section in the tagged README. Its database reset clears local records. For a missing vendor/autoload.php, check that composer install finished successfully."
      },
      {
        "type": "text",
        "title": "Return to the project next time",
        "text": "To leave the container shell, type <code>exit</code>. From the host project folder, use <code>docker compose stop</code> at the end of a session and <code>docker compose up -d</code> next time. Re-enter the workspace shell before running Artisan commands."
      }
    ],
    "q": "Which change should php artisan migrate make at this checkpoint?",
    "options": [
      "Generate the book review pages",
      "Install the Breeze login forms",
      "Create the tables described by the starter migrations"
    ],
    "answer": 2,
    "feedback": "At this tag, the migrations set up Laravel’s initial tables. Books, authors and reviews will each need migrations as you build the catalogue."
  },
  {
    "id": "route",
    "title": "Add your first route",
    "time": "8 min",
    "intro": "Add a new web address to your app and check that Laravel recognises it.",
    "parts": [
      {
        "type": "text",
        "title": "Follow a request",
        "text": "When you visit <code>/books</code>, Laravel looks for a matching route. For now, the route will return plain text. Later it will ask a controller for records and render a view."
      },
      {
        "type": "code",
        "file": "src/routes/web.php",
        "text": "Route::get('/books', function () {\n    return 'Your book catalogue starts here.';\n});",
        "label": "Add below the existing home route"
      },
      {
        "type": "text",
        "title": "Read the code",
        "text": "<code>get</code> handles a browser GET request. <code>/books</code> is its URL path. The function runs when that route matches; its return value becomes the response. Keep the existing <code>use Illuminate\\Support\\Facades\\Route;</code> import at the top."
      },
      {
        "type": "check",
        "text": "Visit http://localhost:8080/books. You should see “Your book catalogue starts here.” The existing / page still has its own route."
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan route:list --path=books",
        "label": "Inspect the registered route"
      },
      {
        "type": "text",
        "title": "Confirm Laravel recognises your route",
        "text": "The <code>route:list</code> command displays routes registered with Laravel. The <code>--path=books</code> option filters the list to routes containing <code>books</code>. Check that you can see a <strong>GET</strong> route with the URI <code>books</code>. This verifies that Laravel has registered your new route, independently of what the browser displays. If it is missing, check the file you edited and the spelling of the URL."
      },
      {
        "type": "help",
        "text": "404? Check the spelling of /books and that you edited src/routes/web.php. A PHP syntax error? Check semicolons, quotes and the closing });. Do not add a second opening <?php tag."
      }
    ],
    "q": "What happens if you change the route path to /library?",
    "options": [
      "/books automatically redirects",
      "The same response moves to /library",
      "The database is renamed"
    ],
    "answer": 1,
    "feedback": "The path determines which URL matches. Unless another route exists, /books will now return a 404."
  },
  {
    "id": "view",
    "title": "Build your first book page",
    "time": "15 min",
    "intro": "Make a Blade page for your new route instead of displaying plain text.",
    "parts": [
      {
        "type": "text",
        "title": "Separate the page from its route",
        "text": "A view holds the HTML. The route chooses which view to return. Create a <code>books</code> folder inside <code>src/resources/views</code>, then create <code>index.blade.php</code> inside it."
      },
      {
        "type": "code",
        "file": "src/resources/views/books/index.blade.php",
        "text": "<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <title>Book Reviews</title>\n</head>\n<body>\n    <h1>Book Reviews</h1>\n    <p>A home for your next good read.</p>\n</body>\n</html>",
        "label": "Create this file"
      },
      {
        "type": "code",
        "file": "src/routes/web.php",
        "text": "Route::get('/books', function () {\n    return view('books.index');\n});",
        "label": "Replace your /books route"
      },
      {
        "type": "text",
        "title": "A name that maps to a file",
        "text": "<code>books.index</code> resolves to <code>resources/views/books/index.blade.php</code> inside Laravel. The dot represents a directory separator. You leave off <code>.blade.php</code> when calling <code>view()</code>."
      },
      {
        "type": "check",
        "text": "Refresh /books. You should see a “Book Reviews” heading and the new paragraph. The browser tab should also say “Book Reviews”."
      },
      {
        "type": "help",
        "text": "“View [books.index] not found”: check the file is in src/resources/views/books/, is named index.blade.php exactly, and has been saved. Case matters inside Linux containers. It must not be index.blade.php.txt."
      }
    ],
    "q": "Which file does view('books.show') look for?",
    "options": [
      "resources/views/books.show.php",
      "resources/views/books/show.blade.php",
      "routes/books/show.php"
    ],
    "answer": 1,
    "feedback": "Dot notation maps nested view folders to a short name. The Blade filename is show.blade.php inside books/."
  },
  {
    "id": "data",
    "title": "Pass data into the page",
    "time": "12 min",
    "intro": "Send information from a Laravel route to a Blade page and display it.",
    "parts": [
      {
        "type": "code",
        "file": "src/routes/web.php",
        "text": "Route::get('/books', function () {\n    $heading = 'The reading room';\n\n    return view('books.index', ['heading' => $heading]);\n});",
        "label": "Replace your /books route"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/index.blade.php",
        "text": "<h1>{{ $heading }}</h1>",
        "label": "Replace only the existing h1 element"
      },
      {
        "type": "text",
        "title": "Connect the two sides",
        "text": "The array key <code>heading</code> becomes <code>$heading</code> in the view. Blade’s double braces print the value and escape HTML. The route currently supplies a fixed string; later, controllers will supply records from the database."
      },
      {
        "type": "check",
        "text": "Refresh /books. The heading now reads “The reading room”. Change the string in the route and refresh again: the template stays the same."
      },
      {
        "type": "text",
        "title": "Try it yourself",
        "text": "Pass a second value called <code>description</code> to the view. Use it in the paragraph instead of the fixed text. Aim to edit only the route data and that paragraph."
      },
      {
        "type": "help",
        "text": "Hint: put a second key/value pair in the array passed to view(). In the template use {{ $description }}. An “Undefined variable” error means the name was not passed, or its spelling differs."
      }
    ],
    "q": "Why use {{ $heading }} rather than raw HTML output?",
    "options": [
      "It escapes HTML in the value",
      "It saves the value in MySQL",
      "It creates a route"
    ],
    "answer": 0,
    "feedback": "Escaping means text containing HTML is displayed as text rather than interpreted as markup. Keep this default for user-supplied content."
  },
  {
    "id": "checkpoint",
    "title": "Check your understanding",
    "time": "10 min",
    "intro": "Build one more page on your own to practise routes, templates and data.",
    "parts": [
      {
        "type": "text",
        "title": "Your challenge",
        "text": "Create an <code>/about</code> route and a <code>resources/views/about.blade.php</code> template. Pass a <code>courseName</code> value from the route and display it in a heading. Include a normal HTML link back to <code>/books</code>."
      },
      {
        "type": "check",
        "text": "Open /about directly. Your heading comes from the route, the link opens /books, and both pages still work after a refresh."
      },
      {
        "type": "help",
        "text": "A possible route: Route::get('/about', function () { return view('about', ['courseName' => 'Book Reviews']); }); In the view, use <h1>{{ $courseName }}</h1> and <a href=\"/books\">Browse books</a> inside a full HTML document."
      },
      {
        "type": "text",
        "title": "Trace what you have built",
        "text": "The browser requests a URL. Laravel matches a route. Your PHP passes data to a Blade view. Blade produces HTML, which the browser displays. Module 2 will introduce the database records that eventually feed these pages."
      },
      {
        "type": "text",
        "title": "Before you move on",
        "text": "You should be able to explain where routes live, how a view name maps to a file, and how a PHP value reaches the page. Mark steps complete when you have checked the result, not just copied the code."
      },
      {
        "type": "text",
        "title": "Keep exploring",
        "text": "Official references: <a href=\"https://laravel.com/docs/12.x/routing\" target=\"_blank\" rel=\"noopener\">Laravel routing ↗</a> and <a href=\"https://laravel.com/docs/12.x/views\" target=\"_blank\" rel=\"noopener\">Laravel views ↗</a>. These lesson examples are deliberately simpler than the final application’s authenticated controller routes."
      }
    ],
    "q": "A view reports “Undefined variable $courseName”. What should you inspect first?",
    "options": [
      "The MySQL password",
      "The data passed to view() and the variable spelling",
      "The CSS stylesheet"
    ],
    "answer": 1,
    "feedback": "Check that the route passes a courseName key and the template uses the same spelling. No database is involved in this page yet."
  },
  {
    "id": "m02-s01",
    "module": 2,
    "title": "Understand the application and its files",
    "time": "25–35 min",
    "intro": "See how the different parts of a Laravel project work together.",
    "parts": [
      {
        "type": "text",
        "title": "What you will build",
        "text": "<p><strong>Your task:</strong> Explore the folder structure of the Laravel project, find the routes and views you used in Module 01, and identify where the database models will be created.</p>"
      },
      {
        "type": "text",
        "title": "Further reading",
        "text": "<p><a href=\"https://john-dempsey.github.io/book-reviews-student/project-setup/orientation.html\" target=\"_blank\" rel=\"noopener\">Read the related tutorial topic: project setup/orientation</a>.</p>"
      },
      {
        "type": "text",
        "title": "Explore the project",
        "text": "<p>Before building the catalogue database, get to know the application you have started. You will identify the main parts of Laravel and see how they work together to respond to a browser request.</p>"
      },
      {
        "type": "text",
        "title": "The domain model",
        "text": "<p>The app is a book review catalogue, built around four things:</p><ul>\n<li>A <strong>User</strong> can write many <strong>Reviews</strong>.</li>\n<li>A <strong>Book</strong> can have many Reviews — but at most <strong>one Review per User per\nBook</strong>. That's not just a rule the app remembers to enforce; it's backed\nby a unique constraint in the database itself, so it holds even if a bug\nelsewhere tries to violate it. You'll build that constraint in this\nlesson's migrations topic.</li>\n<li>A <strong>Book</strong> can have many <strong>Authors</strong>, and an Author can have written many\nBooks — a many-to-many relationship, which needs a join table (<code>author_book</code>)\nin between. If you've drawn an entity-relationship diagram for a\nmany-to-many before, this is exactly that shape.</li>\n<li>A real catalogue would usually give a Book many <strong>Editions</strong> (different\nISBNs, publishers, print runs). This app doesn't — a book's edition\ndetails (ISBN, publisher, price, edition number) live directly on the\n<code>books</code> table, so every Book has exactly one implicit edition. That's a\ndeliberate simplification to keep the schema to a size this course's six\nweeks can comfortably cover, not an oversight.</li>\n</ul><p>In short:</p>"
      },
      {
        "type": "code",
        "file": "Diagram",
        "text": "User ──< Review >── Book ──< author_book >── Author\n        (1 per user            (many-to-many)\n         per book)"
      },
      {
        "type": "text",
        "title": "Authentication and permissions",
        "text": "<p>The application will let people register and sign in. <strong>Authentication</strong> checks who a user is; later, Laravel Breeze will provide the registration and login features.</p><p><strong>Authorisation</strong> controls what a signed-in user is allowed to do. For example, when you build reviews, users will be able to edit and delete their own reviews. The application does not introduce separate administrator and regular-user roles.</p>"
      },
      {
        "type": "text",
        "title": "What is Eloquent?",
        "text": "<p><strong>Eloquent</strong> is Laravel's object-relational mapper (ORM). It lets you represent database records as PHP objects, called <em>models</em>. Instead of writing SQL for every task, you can use expressions such as <code>Book::find(3)</code> to look up a book and <code>$book-&gt;authors</code> to access its authors. You will create these models and relationships in 02-03.</p>"
      },
      {
        "type": "text",
        "title": "The stack, and what's already running",
        "text": "<p>If you haven't already worked through the <strong>First-time setup</strong> steps in\nthis project's <code>README.md</code>, do that now — the rest of this lesson assumes\n<code>docker compose up -d --build</code> has been run at least once, <code>composer install</code> and <code>npm install --ignore-scripts &amp;&amp; npm run build</code> have completed inside the\nworkspace container, and <code>php artisan migrate</code> has run without error.</p><p>That setup brings up four Docker Compose services, defined in\n<code>compose.yaml</code> and the <code>docker/</code> folder alongside it:</p><table>\n<thead>\n<tr>\n<th>Service</th>\n<th>What it is</th>\n<th>URL</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>apache-php-container</code></td>\n<td>Serves the Laravel app</td>\n<td>http://localhost:8080</td>\n</tr>\n<tr>\n<td><code>mysql-container</code></td>\n<td>MySQL 8, holding the app's database</td>\n<td><code>localhost:3306</code></td>\n</tr>\n<tr>\n<td><code>phpmyadmin-container</code></td>\n<td>phpMyAdmin, for browsing that database</td>\n<td>http://localhost:8081</td>\n</tr>\n<tr>\n<td><code>workspace-container</code></td>\n<td>A terminal for <code>php artisan</code>, <code>composer</code>, <code>npm</code></td>\n<td>—</td>\n</tr>\n</tbody>\n</table><p>This is the environment you brought up during setup, so none of it\nshould be unfamiliar: one container serves the app, one runs the database,\none gives you a browser-based way to look inside that database. The one\naddition is <code>workspace-container</code> — it doesn't serve anything itself, it's\njust a shell (<code>docker compose exec workspace-container bash</code>) with PHP,\nComposer, and Node installed, so you have somewhere to run command-line\ntools without needing them inside the container that's serving live\ntraffic.</p><p>Right now, with first-time setup done, you should be able to see:</p><ul>\n<li><strong>The Laravel app</strong>, at http://localhost:8080 — Laravel's own default\nwelcome page. The catalogue tables and models are the next additions\nbuilding.</li>\n<li><strong>phpMyAdmin</strong>, at http://localhost:8081 — log in and you'll find a\n<code>book_reviews</code> database already containing a handful of tables\n(<code>users</code>, <code>sessions</code>, <code>cache</code>, <code>jobs</code>, and a few others) that Laravel\ncreates by default. No <code>books</code>, <code>authors</code>, or <code>reviews</code> tables yet —\nthose come from migrations you're about to write.</li>\n<li><strong>The workspace</strong>, reachable only via <code>docker compose exec workspace-container bash</code> — no URL, since it isn't a web server. This is\nwhere every <code>php artisan</code> and <code>composer</code> command in this lesson gets\nrun.</li>\n</ul>"
      },
      {
        "type": "text",
        "title": "Where the Laravel app itself came from",
        "text": "<p>The project in <code>src/</code> already exists, so you won't run this yourself — but\nit's worth knowing what created it, because you'll see this command again\non your own projects. <code>laravel new .</code> scaffolds a fresh Laravel project\ninto the current directory, and asks a handful of setup questions along\nthe way. This project answered:</p><ul>\n<li><strong>No starter kit</strong> — no built-in auth scaffolding yet. That's what\nYou will install Breeze in Module 03.</li>\n<li><strong>PHPUnit</strong> for testing, not the alternative Pest.</li>\n<li><strong>MySQL</strong> as the database, matching the <code>mysql-container</code> service above.</li>\n</ul><p>What you get back is a <em>bare</em> Laravel installation: the framework, its\ndefault folder structure, and three default migrations (for <code>users</code>,\n<code>cache</code>, and <code>jobs</code>) — but no Breeze, no app-specific models or\nmigrations. Laravel does scaffold one model and one factory by default,\nthough: <code>User</code> (<code>app/Models/User.php</code>) and <code>UserFactory</code>\n(<code>database/factories/UserFactory.php</code>), both generic and both there\nbefore you write a single line of app-specific code. That is the starting database and model structure — <code>users</code>, <code>cache</code>, and <code>jobs</code> tables, a\n<code>User</code> model, a <code>UserFactory</code>, and nothing yet for <code>books</code>, <code>authors</code>, or\n<code>reviews</code> — and exactly what the rest of this lesson builds on top of.</p>"
      },
      {
        "type": "text",
        "title": "What this lesson does",
        "text": "<p>Over the next activities, you will:</p><ol><li>Explore how Laravel routes, views and models fit together.</li><li>Write migrations for <code>books</code>, <code>authors</code>, <code>author_book</code> and <code>reviews</code>.</li><li>Create Eloquent models and define their relationships.</li><li>Write tests to check the models and database constraints.</li></ol><p>Authentication is introduced in Module 03, once the models and basic database structure are in place.</p>"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><a href=\"https://john-dempsey.github.io/book-reviews-student/project-setup/laravel-application-structure.html\" target=\"_blank\" rel=\"noopener\">Read the related tutorial topic: project setup/laravel application structure</a>.</p>"
      },
      {
        "type": "text",
        "title": "Tour the Laravel folders",
        "text": "<p>Before writing any app-specific code, it's worth knowing the shape of what\n<code>laravel new .</code> already gave you, and how a request actually travels\nthrough it. You have already added a simple route and view in Module 01. Now you will explore the framework files that support them.</p>"
      },
      {
        "type": "text",
        "title": "How requests reach Laravel",
        "text": "<p>In the prior PHP module, a URL usually pointed at a real <code>.php</code> file on\ndisk — <code>/about.php</code> served <code>about.php</code>. Laravel doesn't work that way.\nApache's document root points at <code>src/public/</code>, and that folder contains\nan <code>.htaccess</code> file with a rewrite rule at the bottom of it:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "RewriteCond %{REQUEST_FILENAME} !-d\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^ index.php [L]"
      },
      {
        "type": "text",
        "title": "Read the rewrite rule",
        "text": "<p>Read as English: <em>if the requested path isn't a real directory and isn't a\nreal file, rewrite it to <code>index.php</code> instead.</em> So <code>/books</code>, <code>/books/3</code>, and\n<code>/anything-that-doesn't-exist-as-a-file</code> all end up running the exact same\nPHP file — <code>public/index.php</code>, Laravel's <strong>front controller</strong>. Its actual\njob is short:</p>"
      },
      {
        "type": "code",
        "file": "public/index.php",
        "text": "$app = require_once __DIR__.'/../bootstrap/app.php';\n\n$app->handleRequest(Request::capture());"
      },
      {
        "type": "text",
        "title": "The front controller",
        "text": "<p>It boots the framework, hands it the incoming request, and lets Laravel\ndecide what to do with it. Nothing about <em>which</em> code runs is decided by\nthe URL rewriting itself — that's the router's job, covered next. The\nrewrite rule's only job is making sure every request that isn't a real\nfile gets to Laravel at all.</p>"
      },
      {
        "type": "text",
        "title": "Models, views and controllers",
        "text": "<p>Laravel is a <strong>Model-View-Controller</strong> framework — not by forcing rigid\nseparation, but by giving each part its own folder and convention:</p><ul>\n<li>A <strong>Model</strong> represents one thing your data cares about (a <code>Book</code>, a\n<code>Review</code>) and knows how to load and save its own rows. You will create those models in this module.</li>\n<li>A <strong>View</strong> turns data into the actual HTML response — a <strong>Blade</strong>\ntemplate here, not plain PHP <code>echo</code> statements.</li>\n<li>A <strong>Controller</strong> sits between the two: a request arrives, the\nController asks a Model for whatever data it needs, then hands that\ndata to a View to render.</li>\n</ul><p>Strung together, one request looks like this:</p>"
      },
      {
        "type": "code",
        "file": "Diagram",
        "text": "Browser → routes/web.php → Controller → Model (talks to the database)\n                                ↓\n                             Blade View → HTML back to the browser"
      },
      {
        "type": "text",
        "title": "Follow the request",
        "text": "<p>The router decides <em>which</em> Controller (or closure) handles a given URL —\nthat's the piece still missing from the picture above.</p>"
      },
      {
        "type": "text",
        "title": "Find the welcome route",
        "text": "<p><code>routes/web.php</code> is where a URL pattern gets matched to the code that\nhandles it. You have already added a <code>/books</code> route in Module 01. The starter route for the welcome page looks like this:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "Route::get('/', function () {\n    return view('welcome');\n});"
      },
      {
        "type": "text",
        "title": "Read the route definition",
        "text": "<p><code>Route::get()</code> handles <code>GET</code> requests to the path <code>/</code>. Here, it returns the <code>welcome</code> view. In Module 01 you also registered a route for <code>/books</code>; later you will connect that address to a controller method instead of returning a view directly.</p>"
      },
      {
        "type": "text",
        "title": "Where things live",
        "text": "<table>\n<thead>\n<tr>\n<th>Folder</th>\n<th>What lives there</th>\n<th>What's already there</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>app/Models/</code></td>\n<td>Eloquent model classes, one per database table</td>\n<td><code>User.php</code></td>\n</tr>\n<tr>\n<td><code>app/Http/Controllers/</code></td>\n<td>Controller classes</td>\n<td><code>Controller.php</code> — an empty base class every controller will extend</td>\n</tr>\n<tr>\n<td><code>resources/views/</code></td>\n<td>Blade templates (<code>.blade.php</code>)</td>\n<td><code>welcome.blade.php</code></td>\n</tr>\n<tr>\n<td><code>routes/web.php</code></td>\n<td>Maps URLs to closures or controller methods</td>\n<td>The one route above</td>\n</tr>\n<tr>\n<td><code>database/migrations/</code></td>\n<td>One file per schema change, applied in order</td>\n<td><code>users</code>, <code>cache</code>, <code>jobs</code></td>\n</tr>\n<tr>\n<td><code>config/</code></td>\n<td>One PHP file per subsystem, each reading its values from <code>.env</code></td>\n<td><code>database.php</code>, among many others</td>\n</tr>\n<tr>\n<td><code>public/</code></td>\n<td>Anything Apache serves directly</td>\n<td><code>index.php</code>, plus the static content below</td>\n</tr>\n<tr>\n<td><code>artisan</code></td>\n<td>Laravel's command-line entry point — a single file, not a folder</td>\n<td>Every <code>php artisan ...</code> command runs through it</td>\n</tr>\n</tbody>\n</table><p>Almost all of the code you write for the rest of this course lands in the\nfirst four rows.</p>"
      },
      {
        "type": "text",
        "title": "The artisan CLI",
        "text": "<p><code>artisan</code> is the file behind every command-line interaction you'll have\nwith Laravel this course: <code>php artisan migrate</code> (mentioned at the end of\nthe last topic), <code>php artisan make:model</code>, <code>php artisan tinker</code> for\npoking at models interactively, and more as the course goes on. It isn't\na folder holding code you'll write yourself — it's the command-line\ninterface, dispatching to code that already exists inside the framework\nor your own app. You'll always run it from the workspace container's\nterminal, never from your own machine directly.</p>"
      },
      {
        "type": "text",
        "title": "The public folder and static content",
        "text": "<p><code>public/</code> is the folder that the web server serves directly. <code>index.php</code> is Laravel's entry point; files such as <code>favicon.ico</code>, <code>robots.txt</code> and generated CSS or JavaScript assets can be served without going through a Laravel route.</p><p>By contrast, a URL such as <code>/books</code> normally reaches <code>public/index.php</code>, and Laravel chooses which route should handle it.</p>"
      },
      {
        "type": "text",
        "title": "Migrations and seed data",
        "text": "<p><code>database/migrations/</code> is where the migrations mentioned at the end of the\nlast topic actually live — right now, just the three Laravel ships by\ndefault (<code>users</code>, <code>cache</code>, <code>jobs</code>). <code>database/factories/</code> and\n<code>database/seeders/</code> exist too, holding only the default <code>UserFactory</code> for\nnow; you will use these in Module 03.</p><p>Laravel reads its database connection details from <code>.env</code>, not from a\nconfig file you'd edit directly:</p>"
      },
      {
        "type": "code",
        "file": "Environment settings",
        "text": "DB_CONNECTION=mysql\nDB_HOST=mysql\nDB_DATABASE=book_reviews\nDB_USERNAME=laravel"
      },
      {
        "type": "text",
        "title": "Database connection settings",
        "text": "<p><code>config/</code> is where those <code>.env</code> values actually get consumed — one PHP\nfile per subsystem (<code>app.php</code>, <code>database.php</code>, <code>session.php</code>, and more),\neach reading <code>env()</code> calls into plain PHP arrays that the rest of Laravel\nuses. <code>config/database.php</code> specifically is the bridge for the block\nabove, and it's why changing a <code>DB_*</code> value in <code>.env</code> changes which\ndatabase <code>php artisan migrate</code> talks to, with no other file to edit.\n<code>DB_HOST=mysql</code> here is the same <code>mysql-container</code> you saw running in\nphpMyAdmin in the last topic — this <code>.env</code> is how Laravel knows to look\nfor it there instead of on your own machine.</p>"
      },
      {
        "type": "text",
        "title": "Testing",
        "text": "<p><code>tests/</code> splits into <code>tests/Unit/</code> and <code>tests/Feature/</code>, both extending\nthe shared <code>tests/TestCase.php</code>. Unit tests check one class in isolation —\na model's relationships, for example; feature tests make real HTTP\nrequests against a route and check the response, closer to how a browser\nwould actually use the app. Both run against the same MySQL database the\napp itself uses — there's no separate, lighter test database here — with\nthe <code>RefreshDatabase</code> trait resetting it between tests so one test's data\nnever leaks into the next.</p><p>Right now <code>tests/</code> is essentially empty — you will write model tests in activity 02-04, once there's an actual schema and actual models\nworth testing.</p>"
      },
      {
        "type": "check",
        "text": "You can point to public/index.php, routes/web.php, resources/views and app/Models and describe each responsibility."
      },
      {
        "type": "help",
        "text": "If something fails, read the error message and check the file or command used in this step. For route problems try php artisan route:list; for failing tests try php artisan test. Check spelling, namespaces, method names and database relationships before moving on."
      }
    ],
    "q": "How do a route and a view work together in Laravel?",
    "options": [
      "A route chooses how a request is handled; the controller or closure chooses a response, often a Blade view.",
      "Every URL must map directly to an HTML file.",
      "The database sends Blade pages to the browser."
    ],
    "answer": 0,
    "feedback": "A route chooses how a request is handled; the controller or closure chooses a response, often a Blade view."
  },
  {
    "id": "m02-s02",
    "module": 2,
    "title": "Design the four catalogue tables",
    "time": "35–50 min",
    "intro": "Create the database tables that will hold books, authors and reviews.",
    "parts": [
      {
        "type": "text",
        "title": "What you will build",
        "text": "<p><strong>Your task:</strong> Generate each migration in dependency order. Add the columns and foreign keys shown, then run migrate:status. Your migration filenames will contain timestamps generated on your machine.</p>"
      },
      {
        "type": "text",
        "title": "Further reading",
        "text": "<p><a href=\"https://john-dempsey.github.io/book-reviews-student/project-setup/migrations.html\" target=\"_blank\" rel=\"noopener\">Read the related tutorial topic: project setup/migrations</a>.</p>"
      },
      {
        "type": "text",
        "title": "Plan the new tables",
        "text": "<p>You will add four migrations: <code>books</code>, <code>authors</code>, <code>author_book</code> (which links books to their authors) and <code>reviews</code>. Each migration is a PHP file describing the structure of one table. Laravel applies migrations in filename order and records which ones have already run.</p>"
      },
      {
        "type": "text",
        "title": "Generate the migration files",
        "text": "<p>Migration filenames begin with timestamps. Laravel uses these to determine the order in which changes run. This matters here: <code>books</code> and <code>authors</code> must exist before <code>author_book</code> can reference them; <code>books</code> and the existing <code>users</code> table must exist before <code>reviews</code>.</p><p>From the workspace container, generate the four files in the order shown below. <strong>Check the resulting filenames</strong> in <code>src/database/migrations/</code>: the timestamp portion should put <code>books</code>, <code>authors</code>, <code>author_book</code> and <code>reviews</code> in that order. If two files get the same timestamp because they were generated in the same second, adjust the filename timestamps so the dependencies are created first.</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "php artisan make:migration create_books_table\nphp artisan make:migration create_authors_table\nphp artisan make:migration create_author_book_table\nphp artisan make:migration create_reviews_table",
        "label": "Create four migration files"
      },
      {
        "type": "text",
        "title": "Examine a generated migration",
        "text": "<p>Open the newly generated <code>create_books_table</code> file. Its <code>up()</code> method creates the table, while <code>down()</code> defines how to undo that change. Replace the <code>Schema::create(...)</code> body with the version shown in the next step.</p><p>Your timestamped filenames will differ from the examples below. Use the filenames generated on your computer, not the dates in the example paths.</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "Schema::create('books', function (Blueprint $table) {\n    $table->id();\n    $table->timestamps();\n});"
      },
      {
        "type": "text",
        "title": "Add the table definitions",
        "text": "<p>Update the <code>up()</code> method in each migration with the relevant <code>Schema::create(...)</code> code below. Keep the generated <code>&lt;?php</code>, <code>use</code> imports, class declaration and <code>down()</code> method intact. Each <code>down()</code> method should use <code>Schema::dropIfExists()</code> for that table.</p>"
      },
      {
        "type": "text",
        "title": "Define the books table",
        "text": "<p>Start with the <code>books</code> migration. The table stores the title, publication year, optional description and cover image, plus basic edition details.</p>"
      },
      {
        "type": "code",
        "file": "database/migrations/2026_09_12_065917_create_books_table.php",
        "text": "Schema::create('books', function (Blueprint $table) {\n    $table->id();\n    $table->string('title');\n    $table->text('description')->nullable();\n    $table->year('year');\n    $table->string('image')->nullable();\n\n    // Part 1 keeps one implicit edition per book, rather than a\n    // separate editions table - these four fields describe that\n    // one edition directly.\n    $table->string('isbn')->nullable();\n    $table->string('publisher')->nullable();\n    $table->string('edition_number')->nullable();\n    $table->decimal('price', 8, 2)->nullable();\n\n    $table->timestamps();\n});"
      },
      {
        "type": "text",
        "title": "Understand the book columns",
        "text": "<p>Most of this reads directly off your SQL knowledge: <code>string</code> is\n<code>VARCHAR(255)</code>, <code>text</code> is <code>TEXT</code>, <code>decimal(8, 2)</code> is exactly the SQL type\nof the same name. <code>year()</code> is one you might not have reached for by\nhand — MySQL has a dedicated <code>YEAR</code> type, and this is the column it's\nfor. <code>$table-&gt;id()</code> is the one genuinely new piece: an auto-incrementing\n<code>BIGINT UNSIGNED</code> primary key named <code>id</code>, which is also the column every\n<code>foreignId()</code> below assumes it's pointing at.</p>"
      },
      {
        "type": "code",
        "file": "database/migrations/2026_09_12_065936_create_authors_table.php",
        "text": "Schema::create('authors', function (Blueprint $table) {\n    $table->id();\n    $table->string('name');\n    $table->string('image')->nullable();\n    $table->text('bio')->nullable();\n    $table->timestamps();\n});"
      },
      {
        "type": "text",
        "title": "Why authors have their own table",
        "text": "<p>No foreign keys yet — an <code>Author</code> doesn't belong to anything else. The\nrelationship between books and authors lives in the next table instead.</p>"
      },
      {
        "type": "code",
        "file": "database/migrations/2026_09_12_065948_create_author_book_table.php",
        "text": "Schema::create('author_book', function (Blueprint $table) {\n    $table->id();\n    $table->foreignId('book_id')->constrained()->onDelete('cascade');\n    $table->foreignId('author_id')->constrained()->onDelete('cascade');\n    $table->timestamps();\n});"
      },
      {
        "type": "text",
        "title": "Link books and authors",
        "text": "<p>A Book can have many Authors, and an Author can have written many Books —\na many-to-many relationship, which needs a table in between holding pairs\nof IDs. <code>author_book</code> is exactly that join table, named the way Laravel\nexpects: the two related table names, singular, alphabetical, joined with\nan underscore. <code>$table-&gt;foreignId('book_id')</code> on its own just adds a\n<code>BIGINT UNSIGNED</code> column named <code>book_id</code>; <code>-&gt;constrained()</code> is what turns\nit into a real foreign key — it works out, from the column's own name,\nthat <code>book_id</code> should reference <code>books.id</code>. Running <code>SHOW CREATE TABLE author_book</code> afterward shows exactly the constraint you'd expect to have\nwritten by hand:</p>"
      },
      {
        "type": "code",
        "file": "SQL example",
        "text": "CONSTRAINT `author_book_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,\nCONSTRAINT `author_book_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE"
      },
      {
        "type": "text",
        "title": "Cascade deletes",
        "text": "<p><code>-&gt;onDelete('cascade')</code> on both means deleting a Book or an Author also\ndeletes the pairing rows that mentioned it — without it, that delete\nwould simply fail with a foreign-key-constraint error instead, since a\ndangling <code>author_book</code> row referencing a Book that no longer exists isn't\nallowed.</p>"
      },
      {
        "type": "code",
        "file": "database/migrations/2026_09_12_070000_create_reviews_table.php",
        "text": "Schema::create('reviews', function (Blueprint $table) {\n    $table->id();\n    $table->foreignId('book_id')->constrained()->onDelete('cascade');\n    $table->foreignId('user_id')->constrained()->onDelete('cascade');\n    $table->unsignedTinyInteger('rating');\n    $table->text('comment')->nullable();\n    $table->timestamps();\n\n    // At most one review per user per book - enforced here, not\n    // just in application code.\n    $table->unique(['book_id', 'user_id']);\n});"
      },
      {
        "type": "text",
        "title": "Prevent duplicate reviews",
        "text": "<p><code>rating</code> only ever needs to hold 1–5, so <code>unsignedTinyInteger</code> — SQL's\nsmallest integer type — is a better fit than a plain <code>integer</code>; nothing\nabout the app changes if the column happens to be smaller than it needs\nto be, but it's worth picking the type that actually matches the data.\nThe last line is doing real work: a <strong>unique composite index</strong> across\ntwo columns together, so the <em>pair</em> <code>(book_id, user_id)</code> can't repeat —\none row per user for a given book is fine, and one row per book for a\ngiven user is fine, but the same user reviewing the same book twice would\nviolate the index and fail at the database level, not just get caught by\na validation rule that a bug could bypass.</p>"
      },
      {
        "type": "text",
        "title": "Apply the new schema",
        "text": "<p>Once all four files are saved, run the migration command below <strong>once</strong>. <code>--step</code> records each migration separately, making it easier to reverse one later if needed. Laravel creates the new tables in timestamp order.</p><p>If you see an error about a missing referenced table, check the timestamp order of your migration filenames and correct it before continuing.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan migrate --step\nphp artisan migrate:status",
        "label": "Create the tables and verify their status"
      },
      {
        "type": "text",
        "title": "Understand the migration status",
        "text": "<p>In <code>migrate:status</code>, look for the four new migrations marked <strong>Ran</strong>. Your timestamps and batch numbers may be different from those in the example below. Running <code>php artisan migrate</code> again will only apply migrations that are still pending.</p>"
      },
      {
        "type": "text",
        "file": "Terminal",
        "text": "<p>Without <code>--step</code>, migrations run together in the same batch. With it, each migration gets its own batch, so you can undo the most recent change without necessarily undoing the others.</p>",
        "title": "Why the --step option matters"
      },
      {
        "type": "code",
        "file": "Example · migration status",
        "text": "$ php artisan migrate:status\n\n  Migration name .............................................. Batch / Status\n  0001_01_01_000000_create_users_table ............................... [1] Ran\n  0001_01_01_000001_create_cache_table ............................... [1] Ran\n  0001_01_01_000002_create_jobs_table ................................ [1] Ran\n  2026_09_12_065917_create_books_table ................................ [2] Ran\n  2026_09_12_065936_create_authors_table ............................... [3] Ran\n  2026_09_12_065948_create_author_book_table ........................... [4] Ran\n  2026_09_12_070000_create_reviews_table ................................ [5] Ran",
        "label": "Illustrative output (yours will differ)"
      },
      {
        "type": "text",
        "title": "If you need to reverse a migration",
        "text": "<p>Each migration contains a <code>down()</code> method. <code>php artisan migrate:rollback</code> uses it to undo the last batch; <code>--step=1</code> limits the rollback to the most recently applied migration. <strong>You do not need to roll anything back for this activity.</strong> The examples below are for reference only.</p>"
      },
      {
        "type": "code",
        "file": "Optional reference · do not run during setup",
        "text": "php artisan migrate:rollback --step=1\n# If you deliberately rolled one migration back, reapply it:\nphp artisan migrate --step",
        "label": "Rollback and reapply a migration"
      },
      {
        "type": "text",
        "title": "Working with migrations later",
        "text": "<p>For now, check the schema and continue to the model files. Once a migration has been shared and used by others, changes to the database structure should normally be added in a new migration rather than editing one that has already been applied.</p>"
      },
      {
        "type": "check",
        "text": "In phpMyAdmin, you can see <code>books</code>, <code>authors</code>, <code>author_book</code> and <code>reviews</code>. In <code>php artisan migrate:status</code>, each is marked <strong>Ran</strong>. The <code>reviews</code> migration includes a unique constraint for <code>book_id</code> and <code>user_id</code>."
      },
      {
        "type": "help",
        "text": "If something fails, read the error message and check the file or command used in this step. For route problems try php artisan route:list; for failing tests try php artisan test. Check spelling, namespaces, method names and database relationships before moving on."
      }
    ],
    "q": "What is the role of author_book?",
    "options": [
      "It stores exactly one author per book.",
      "It contains Laravel users’ passwords.",
      "It stores the many-to-many relationship between books and authors."
    ],
    "answer": 2,
    "feedback": "It stores the many-to-many relationship between books and authors."
  },
  {
    "id": "m02-s03",
    "module": 2,
    "title": "Build models and relationships",
    "time": "30–40 min",
    "intro": "Create PHP model classes and connect books, authors, users and reviews.",
    "parts": [
      {
        "type": "text",
        "title": "What you will build",
        "text": "<p><strong>Your task:</strong> Create three model files, add their fillable fields and relationship methods, then add one relationship to the existing <code>User</code> model. Finally, use Tinker to confirm that the book–author relationship works.</p>"
      },
      {
        "type": "text",
        "title": "Further reading",
        "text": "<p><a href=\"https://john-dempsey.github.io/book-reviews-student/project-setup/eloquent-models-and-relationships.html\" target=\"_blank\" rel=\"noopener\">Read the related tutorial topic: project setup/eloquent models and relationships</a>.</p>"
      },
      {
        "type": "text",
        "title": "Models and Eloquent",
        "text": "<p>Your migrations created the tables, but you still need PHP classes to work with their records. Laravel's <strong>Eloquent ORM</strong> connects models to database tables. For example, <code>Book::find(3)</code> looks for the book with ID 3, and <code>Book::create([...])</code> can insert a new book.</p><p>Eloquent uses naming conventions: <code>Book</code> maps to <code>books</code>, <code>Author</code> maps to <code>authors</code> and <code>Review</code> maps to <code>reviews</code>. You do not need a separate model for <code>author_book</code> because Eloquent manages that pivot table through the relationship methods.</p>"
      },
      {
        "type": "text",
        "title": "Generate the model files",
        "text": "<p>Open the workspace-container terminal and run the commands below, from the Laravel project directory. The <code>make:model</code> command creates a PHP class in <code>app/Models/</code>. The project already has <code>app/Models/User.php</code>, so <strong>do not create another User model</strong>.</p><p>After running the commands, check that your editor shows <code>src/app/Models/Book.php</code>, <code>Author.php</code> and <code>Review.php</code>. The <code>src/</code> prefix is visible on your computer; inside the container Laravel starts at that folder.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan make:model Book\nphp artisan make:model Author\nphp artisan make:model Review",
        "label": "Create Book, Author and Review models"
      },
      {
        "type": "text",
        "title": "Create the Book model",
        "text": "<p>Open <code>src/app/Models/Book.php</code> and update it to the code below. <code>protected $fillable</code> lists the attributes Eloquent is allowed to set through <code>Book::create()</code>. This prevents unexpected fields being mass-assigned when the application later accepts form data.</p><p>The <code>authors()</code> method uses <code>belongsToMany()</code> to link books and authors through <code>author_book</code>. The <code>reviews()</code> method uses <code>hasMany()</code> because a book can have multiple reviews.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Models/Book.php",
        "text": "<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\nuse Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;\nuse Illuminate\\Database\\Eloquent\\Relations\\HasMany;\n\nclass Book extends Model\n{\n    use HasFactory;\n\n    protected $fillable = [\n        'title',\n        'description',\n        'year',\n        'image',\n        'isbn',\n        'publisher',\n        'edition_number',\n        'price',\n    ];\n\n    public function authors(): BelongsToMany\n    {\n        return $this->belongsToMany(Author::class);\n    }\n\n    public function reviews(): HasMany\n    {\n        return $this->hasMany(Review::class);\n    }\n}",
        "label": "Use this as the initial Book model"
      },
      {
        "type": "text",
        "title": "Create the Author model",
        "text": "<p>Open <code>src/app/Models/Author.php</code> and update it as shown. The <code>books()</code> method is the other side of the many-to-many book–author relationship.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Models/Author.php",
        "text": "<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\nuse Illuminate\\Database\\Eloquent\\Relations\\BelongsToMany;\n\nclass Author extends Model\n{\n    use HasFactory;\n\n    protected $fillable = [\n        'name',\n        'image',\n        'bio',\n    ];\n\n    public function books(): BelongsToMany\n    {\n        return $this->belongsToMany(Book::class);\n    }\n}",
        "label": "Allow author details and link authors to books"
      },
      {
        "type": "text",
        "title": "Create the Review model",
        "text": "<p>Open <code>src/app/Models/Review.php</code>. A review belongs to one book and one user, so it uses two <code>belongsTo()</code> relationships. Its <code>fillable</code> fields include the IDs that link it to those records.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Models/Review.php",
        "text": "<?php\n\nnamespace App\\Models;\n\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\nuse Illuminate\\Database\\Eloquent\\Relations\\BelongsTo;\n\nclass Review extends Model\n{\n    use HasFactory;\n\n    protected $fillable = [\n        'book_id',\n        'user_id',\n        'rating',\n        'comment',\n    ];\n\n    public function book(): BelongsTo\n    {\n        return $this->belongsTo(Book::class);\n    }\n\n    public function user(): BelongsTo\n    {\n        return $this->belongsTo(User::class);\n    }\n}",
        "label": "Add review fields and relationships"
      },
      {
        "type": "text",
        "title": "Add the reviews relationship to User",
        "text": "<p>Laravel already provided <code>src/app/Models/User.php</code>. Open it, and <strong>keep its existing authentication code</strong>. Add the <code>HasMany</code> import with the other <code>use</code> statements near the top of the file, then add the <code>reviews()</code> method inside the <code>User</code> class, before its final closing brace.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Models/User.php · add among the imports",
        "text": "use Illuminate\\Database\\Eloquent\\Relations\\HasMany;",
        "label": "Import the HasMany relationship type"
      },
      {
        "type": "code",
        "file": "src/app/Models/User.php · add inside User class",
        "text": "public function reviews(): HasMany\n{\n    return $this->hasMany(Review::class);\n}",
        "label": "Add the user’s reviews relationship"
      },
      {
        "type": "text",
        "title": "Understand the different relationships",
        "text": "<p>A <code>Book</code> can have many authors and an <code>Author</code> can have many books: both use <code>belongsToMany()</code>. A <code>Book</code> or a <code>User</code> can have many reviews: they use <code>hasMany()</code>. Each individual <code>Review</code> refers back to one <code>Book</code> and one <code>User</code> with <code>belongsTo()</code>.</p><p>When you call <code>$book-&gt;authors()</code> with parentheses, you get the relationship object, which can be used to add links. When you access <code>$book-&gt;authors</code> as a property, Eloquent loads the related author records.</p>"
      },
      {
        "type": "code",
        "file": "Eloquent relationship example",
        "text": "$book->authors()->attach($author); // add a row to author_book\n$book->authors;                    // load this book's authors",
        "label": "Method for a query or action; property for results"
      },
      {
        "type": "text",
        "title": "Try it in Tinker",
        "text": "<p>Laravel Tinker lets you run PHP against your application without building a web page. Start it with the command below. When you see the interactive prompt, enter the PHP statements in the next code panel one at a time. <strong>Do not type a <code>$</code> shell prompt or a <code>&gt;</code> Tinker prompt.</strong></p><p>These records are written to your local development database, so they will still be there after you leave Tinker. You can inspect them in phpMyAdmin.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan tinker",
        "label": "Open the interactive PHP console"
      },
      {
        "type": "code",
        "file": "Tinker · PHP statements",
        "text": "$book = \\App\\Models\\Book::create(['title' => 'Dune', 'year' => 1965]);\n$author = \\App\\Models\\Author::create(['name' => 'Frank Herbert']);\n$book->authors()->attach($author);\n$book->authors->pluck('name');",
        "label": "Create a book, create an author and connect them"
      },
      {
        "type": "text",
        "title": "Check what happened",
        "text": "<p>The final Tinker statement should return a collection containing <code>Frank Herbert</code>. Type <code>exit</code> when you are finished. In the next step, you will verify the records directly in the database.</p><p>The model classes here are starter implementations. Later modules extend them with factories and search functionality.</p>"
      },
      {
        "type": "text",
        "title": "Verify the records in phpMyAdmin",
        "text": "<p>Open <a href=\"http://localhost:8081\" target=\"_blank\" rel=\"noopener\">phpMyAdmin</a> and select your <code>book_reviews</code> database. Choose <strong>Browse</strong> for <code>books</code> and <code>authors</code> to find the rows you created in Tinker. Then open <code>author_book</code>: it should contain a record linking those two IDs. Check that the IDs match the corresponding book and author rows. This is how you can confirm that <code>attach()</code> wrote the relationship to the database.</p>"
      },
      {
        "type": "check",
        "text": "You can see your new Book and Author rows and their link in the <code>author_book</code> table in phpMyAdmin. You have also created the three models and added the <code>reviews()</code> relationship to User. Next, you will test them."
      },
      {
        "type": "help",
        "text": "If the make:model command cannot find Artisan, enter the workspace container first. If you see a MassAssignmentException, check the $fillable array. If a relationship method is undefined, check the spelling, imports and class braces in the relevant model. If you get a SQL table-not-found error, check that the migrations in 02-02 ran."
      }
    ],
    "q": "What relationship connects a book to authors?",
    "options": [
      "There is no database connection between them.",
      "belongsToMany: the author_book table supports multiple authors on multiple books.",
      "hasOne is used for any plural relationship."
    ],
    "answer": 1,
    "feedback": "belongsToMany: the author_book table supports multiple authors on multiple books."
  },
  {
    "id": "m02-s04",
    "module": 2,
    "title": "Write your first model tests",
    "time": "25–40 min",
    "intro": "Create test files and check that your models and their relationships work.",
    "parts": [
      {
        "type": "text",
        "title": "Your goal",
        "text": "<p>Create three PHP test files, one for each model. The tests will save temporary example records and check that the database and model relationships behave as expected. You will write the files yourselves, rather than copying the finished project’s later factory tests.</p>"
      },
      {
        "type": "text",
        "title": "Where test files belong",
        "text": "<p>Inside the Laravel project, find <code>src/tests/Unit</code> (or <code>tests/Unit</code> from inside the workspace container). Tests in this folder are PHP classes. Laravel uses PHPUnit to run methods whose names start with <code>test_</code>. Each test performs an action and checks its result with an <em>assertion</em>.</p>"
      },
      {
        "type": "text",
        "title": "Generate three test classes",
        "text": "<p>Open the Docker workspace terminal you used in earlier activities. Run these commands <strong>from inside the Laravel directory</strong>. They create <code>BookTest.php</code>, <code>AuthorTest.php</code> and <code>ReviewTest.php</code> under <code>tests/Unit</code>. If a file already exists, inspect it rather than overwriting your work.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace",
        "text": "php artisan make:test BookTest --unit\nphp artisan make:test AuthorTest --unit\nphp artisan make:test ReviewTest --unit"
      },
      {
        "type": "text",
        "title": "What the generated files contain",
        "text": "<p>Open <code>tests/Unit/BookTest.php</code>. The generator creates a small test class. For these database tests, we need it to extend <code>Tests\\TestCase</code> (not the plain PHPUnit <code>TestCase</code> class), because Laravel’s testing helpers and database setup are required. The complete examples below include that change, all the <code>use</code> imports and the test methods.</p>"
      },
      {
        "type": "text",
        "title": "Keep database tests safe",
        "text": "<p>These tests use <code>RefreshDatabase</code>. It uses transactions when possible and can also run migrations to prepare the database. <strong>It is not a guarantee that existing local data will be preserved</strong>: the initial migration setup can rebuild tables. The supplied project does not define a separate test database in <code>phpunit.xml</code>, so only run the examples against a disposable local development database (or a separately configured test database), never a database containing work you need to keep.</p>"
      },
      {
        "type": "text",
        "title": "Test the Book model",
        "text": "<p>Replace the generated contents of <code>tests/Unit/BookTest.php</code> with the following complete class. It checks that a book can be saved, authors can be attached, and a book can have reviews. Check the <code>namespace</code> and <code>use</code> declarations at the top before running it.</p>"
      },
      {
        "type": "code",
        "file": "src/tests/Unit/BookTest.php",
        "text": "<?php\n\nnamespace Tests\\Unit;\n\nuse App\\Models\\Author;\nuse App\\Models\\Book;\nuse App\\Models\\User;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass BookTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_a_book_can_be_created(): void\n    {\n        $book = Book::create(['title' => 'The Pragmatic Programmer', 'year' => 1999]);\n\n        $this->assertDatabaseHas('books', ['title' => 'The Pragmatic Programmer']);\n        $this->assertSame(1999, $book->year);\n    }\n\n    public function test_a_book_has_many_authors(): void\n    {\n        $book = Book::create(['title' => 'Clean Code', 'year' => 2008]);\n        $author = Author::create(['name' => 'Robert C. Martin']);\n        $book->authors()->attach($author);\n\n        $this->assertCount(1, $book->authors);\n        $this->assertTrue($book->authors->first()->is($author));\n    }\n\n    public function test_a_book_has_many_reviews(): void\n    {\n        $book = Book::create(['title' => 'Refactoring', 'year' => 1999]);\n        $user = User::create([\n            'name' => 'Test User',\n            'email' => 'book.test@example.com',\n            'password' => 'password',\n        ]);\n        $book->reviews()->create(['user_id' => $user->id, 'rating' => 5]);\n\n        $this->assertCount(1, $book->reviews);\n    }\n}"
      },
      {
        "type": "text",
        "title": "Test the Author model",
        "text": "<p>Open the generated <code>tests/Unit/AuthorTest.php</code> and replace its contents with the class below. The second test checks the relationship in the opposite direction, from an author to their books.</p>"
      },
      {
        "type": "code",
        "file": "src/tests/Unit/AuthorTest.php",
        "text": "<?php\n\nnamespace Tests\\Unit;\n\nuse App\\Models\\Author;\nuse App\\Models\\Book;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass AuthorTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_an_author_can_be_created(): void\n    {\n        Author::create(['name' => 'Andy Hunt']);\n\n        $this->assertDatabaseHas('authors', ['name' => 'Andy Hunt']);\n    }\n\n    public function test_an_author_has_many_books(): void\n    {\n        $author = Author::create(['name' => 'Martin Fowler']);\n        $book = Book::create(['title' => 'Refactoring', 'year' => 1999]);\n        $author->books()->attach($book);\n\n        $this->assertCount(1, $author->books);\n        $this->assertTrue($author->books->first()->is($book));\n    }\n}"
      },
      {
        "type": "text",
        "title": "Test reviews and the unique constraint",
        "text": "<p>Complete <code>tests/Unit/ReviewTest.php</code> using the code below. The two small <code>makeBook()</code> and <code>makeUser()</code> methods belong <strong>inside this class</strong>; they simply avoid repeating the setup in every test. The last test deliberately tries to create two reviews for the same book and user, checking that the database rejects the duplicate.</p>"
      },
      {
        "type": "code",
        "file": "src/tests/Unit/ReviewTest.php",
        "text": "<?php\n\nnamespace Tests\\Unit;\n\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse App\\Models\\User;\nuse Illuminate\\Database\\UniqueConstraintViolationException;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass ReviewTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_a_review_belongs_to_a_book_and_a_user(): void\n    {\n        $book = $this->makeBook();\n        $user = $this->makeUser();\n        $review = Review::create([\n            'book_id' => $book->id,\n            'user_id' => $user->id,\n            'rating' => 4,\n            'comment' => 'Excellent read.',\n        ]);\n\n        $this->assertDatabaseHas('reviews', ['rating' => 4]);\n        $this->assertTrue($review->book->is($book));\n        $this->assertTrue($review->user->is($user));\n    }\n\n    public function test_a_user_can_have_many_reviews(): void\n    {\n        $user = $this->makeUser();\n        Review::create(['book_id' => $this->makeBook()->id, 'user_id' => $user->id, 'rating' => 3]);\n        Review::create(['book_id' => $this->makeBook()->id, 'user_id' => $user->id, 'rating' => 4]);\n\n        $this->assertCount(2, $user->reviews);\n    }\n\n    public function test_a_user_cannot_review_the_same_book_twice(): void\n    {\n        $book = $this->makeBook();\n        $user = $this->makeUser();\n        Review::create(['book_id' => $book->id, 'user_id' => $user->id, 'rating' => 5]);\n\n        $this->expectException(UniqueConstraintViolationException::class);\n        Review::create(['book_id' => $book->id, 'user_id' => $user->id, 'rating' => 1]);\n    }\n\n    private function makeBook(): Book\n    {\n        return Book::create(['title' => 'Test Book', 'year' => 2000]);\n    }\n\n    private function makeUser(): User\n    {\n        return User::create([\n            'name' => 'Test User',\n            'email' => 'review.test@example.com',\n            'password' => 'password',\n        ]);\n    }\n}"
      },
      {
        "type": "text",
        "title": "Run one class, then all three",
        "text": "<p>Save all three files. Start by running the book tests; this makes errors easier to trace. Then run all three tests. If the suite also runs other tests generated by Laravel, that is normal. Use the terminal output to find the test file and line number when something fails.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace",
        "text": "php artisan test --filter=BookTest\nphp artisan test --filter=AuthorTest\nphp artisan test --filter=ReviewTest"
      },
      {
        "type": "text",
        "title": "Read a passing assertion",
        "text": "<p><code>assertDatabaseHas('books', [...])</code> asks whether a matching row exists in the database. <code>assertCount(1, $book-&gt;authors)</code> checks the number of related models. <code>expectException(...)</code> means the test succeeds only if that specific error is thrown. These are checks of the models you created in 02-03, without introducing factories ahead of the next module.</p>"
      },
      {
        "type": "check",
        "text": "All three test classes pass on your disposable local test data. You can explain why a failed assertion points to a particular model, relationship or database rule."
      },
      {
        "type": "help",
        "text": "If something fails, read the error message and check the file or command used in this step. For route problems try php artisan route:list; for failing tests try php artisan test. Check spelling, namespaces, method names and database relationships before moving on."
      }
    ],
    "q": "Why do we use RefreshDatabase?",
    "options": [
      "It gives tests a predictable schema and isolates database state.",
      "To keep data permanently across tests.",
      "To make the tests run only on production."
    ],
    "answer": 0,
    "feedback": "It gives tests a predictable schema and isolates database state."
  },
  {
    "id": "m03-s01",
    "module": 3,
    "title": "Install Breeze and test sign-in",
    "time": "25–40 min",
    "intro": "Add registration and sign-in pages, then create an account and log in to your app.",
    "parts": [
      {
        "type": "text",
        "title": "What you will build",
        "text": "<p><strong>Your task:</strong> Install Breeze, then open the new registration page, create a test account, sign out and sign in again. You should finish this activity logged in to your local Laravel app.</p><p>Run the installation commands in the Docker workspace terminal. Use your browser for the account checks.</p>"
      },
      {
        "type": "text",
        "title": "Further reading",
        "text": "<p><a href=\"https://john-dempsey.github.io/book-reviews-student/project-setup/installing-laravel-and-breeze.html\" target=\"_blank\" rel=\"noopener\">Read the related tutorial topic: project setup/installing laravel and breeze</a>.</p>"
      },
      {
        "type": "text",
        "title": "Add registration and login",
        "text": "<p>You have already used <strong>Composer</strong> to install PHP dependencies and <strong>npm</strong> to build frontend assets during setup. This activity uses those familiar tools to add Laravel Breeze, which provides registration and login screens, authentication routes and related code. First, look briefly at what each package manager does; then install Breeze and verify the new pages.</p>"
      },
      {
        "type": "text",
        "title": "How Composer manages PHP packages",
        "text": "<p>Laravel itself, and everything it depends on, arrived in <code>src/</code> as\nComposer packages — you saw <code>vendor/</code> get populated by <code>composer install</code>\nduring first-time setup. <code>composer.json</code> is the list of packages a\nproject depends on, by name and version constraint:</p>"
      },
      {
        "type": "code",
        "file": "composer.json",
        "text": "\"require\": {\n    \"php\": \"^8.2\",\n    \"laravel/framework\": \"^12.0\",\n    \"laravel/tinker\": \"^2.10.1\"\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>composer install</code> reads a second file, <code>composer.lock</code>, and installs the\n<em>exact</em> versions it records — that's what makes first-time setup\nreproducible across machines. <code>composer update</code> is different: it re-reads\n<code>composer.json</code>'s version constraints, works out the newest versions that\nstill satisfy them, and rewrites <code>composer.lock</code> to match. Adding a\nbrand-new package — which is what installing Breeze means — always goes\nthrough <code>update</code>, since there's nothing in the lock file for a package\nthat isn't in <code>composer.json</code> yet.</p>"
      },
      {
        "type": "text",
        "title": "How npm builds the frontend assets",
        "text": "<p><code>package.json</code> is Composer's JavaScript equivalent — a list of JS\npackages, read by <code>npm install</code>. The bare install already lists a few:\nTailwind CSS (for styling) and Vite (the build tool). Browsers can't run\nTailwind's utility classes or your <code>.css</code>/<code>.js</code> source files directly the\nway they are on disk — they need <strong>bundling</strong>: resolving imports,\ncompiling Tailwind's classes into plain CSS, and writing the result to\n<code>public/build/</code> as a handful of hashed files a Blade view pulls in with\none <code>@vite(...)</code> directive. Vite is the tool that does that bundling.</p><p>Two npm scripts matter, both already defined in <code>package.json</code>:</p><ul>\n<li><code>npm run build</code> — one-shot, produces the optimized files that actually\nship. This is what first-time setup ran, and what you'll re-run any time\nyou want a fresh production bundle.</li>\n<li><code>npm run dev</code> — starts Vite in watch mode instead: it stays running,\nrebuilding automatically as you edit CSS/JS, and the browser picks up\nthe change without a manual reload. You won't need this yet — it\nmatters once you're actively editing views — but it's worth knowing it\nexists, since <code>compose.yaml</code> already exposes the port it runs on\n(<code>5173</code>) for exactly that purpose.</li>\n</ul>"
      },
      {
        "type": "text",
        "title": "The starter kit this project didn't install",
        "text": "<p><code>laravel new</code> (the command that created <code>src/</code> before this lesson) asks\nwhich <strong>starter kit</strong> to scaffold in, alongside the questions covered in\nthe last topic. A starter kit is a ready-made authentication setup —\nregistration, login, and a starting frontend stack — installed in the\nsame step as the framework itself. This project answered <strong>None</strong>,\ndeliberately: every starter kit <code>laravel new</code> currently offers builds on\nInertia (React, Vue, or Livewire), wiring up an SPA-shaped frontend this\ncourse isn't using.</p><p>Skipping the prompt doesn't mean skipping authentication — it means\ninstalling it separately, afterward, from a stack that fits this course:\n<strong>Laravel Breeze</strong>.</p>"
      },
      {
        "type": "text",
        "title": "Installing Breeze",
        "text": "<p>Breeze isn't part of the starter-kit prompt above; it's an ordinary\nComposer package, added like any other:</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "composer require laravel/breeze --dev"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>--dev</code> marks it a development-only dependency — Breeze <em>generates</em> auth\ncode into your app once, it isn't something the running app loads at\nrequest time, so it has no business shipping to a production install\nthe way <code>laravel/framework</code> does. Breeze's own installer then does the\nactual scaffolding, and takes one argument: which frontend stack to\ngenerate:</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "php artisan breeze:install blade"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>blade</code> is the stack this app uses throughout — plain Blade views and\ncontrollers, no Inertia, matching the \"None\" choice above. (Breeze also\noffers <code>react</code>, <code>vue</code>, and <code>api</code> stacks; not used here.) That one command\ngenerated the auth routes, views, and controller, then ran <code>npm install</code>\nand <code>npm run build</code> on its own, so the styled result is ready to view\nimmediately.</p>"
      },
      {
        "type": "text",
        "title": "What actually landed",
        "text": "<ul>\n<li><code>routes/auth.php</code> — registration, login, logout, and password-reset\nroutes, <code>require</code>d from the bottom of <code>routes/web.php</code>.</li>\n<li><code>resources/views/auth/</code> — a Blade view per route above; <code>dashboard.blade.php</code>\nand <code>resources/views/profile/</code> for a logged-in user's own account page.</li>\n<li><code>app/Http/Controllers/Auth/</code> and <code>ProfileController.php</code> — the\ncontrollers those routes call.</li>\n<li><code>tests/Feature/Auth/</code> and <code>ProfileTest.php</code> — Breeze ships its own\nfeature tests for every route it just generated.</li>\n</ul><p>Nothing about the database changed — Breeze's Blade stack reuses the\n<code>users</code> migration <code>laravel new</code> already created, so there's nothing new\nto migrate here. One smaller, purely cosmetic change is worth naming so it\ndoesn't look like a mistake later: Breeze's installer replaced the bare\ninstall's Tailwind v4 setup (a plugin in <code>vite.config.js</code>, configured via\nan <code>@theme</code> block in <code>app.css</code> itself) with the older <code>tailwind.config.js</code></p><ul>\n<li><code>postcss.config.js</code> pair and Tailwind v3 — Breeze's Blade stack still\ntargets that setup. Both are Tailwind; only the configuration shape\ndiffers.</li>\n</ul><p>None of this touches authoriz<em>ation</em> — who's allowed to do what. Breeze\nonly answers <em>who's logged in</em>, the same distinction raised at the start\nof this lesson.</p><p><strong>Check your routes:</strong> Breeze may replace the earlier <code>routes/web.php</code> file when it installs its dashboard and authentication pages. If the temporary <code>/books</code> route from Module 01 has disappeared, that is expected. You will add the book routes again in Module 04.</p>"
      },
      {
        "type": "text",
        "title": "Register and sign in to your app",
        "text": "<p>Once Breeze has finished installing, open <a href=\"http://localhost:8080/register\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/register</a> in your browser. You should see a registration form.</p><ol><li>Enter a name, an email address for local testing (for example, <code>student@example.test</code>) and a password you choose for this practice account. Do not reuse a real password.</li><li>Select <strong>Register</strong>. Laravel should create your user record and take you to <code>/dashboard</code>. This confirms that registration worked and that you are signed in.</li><li>Use the account menu to <strong>Log Out</strong>.</li><li>Open <a href=\"http://localhost:8080/login\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/login</a>. Sign in using the same email and password. You should return to the dashboard.</li></ol><p><strong>Stay signed in</strong> for the next activities, when you will be browsing book and author pages. If you are redirected to <code>/login</code> later, sign in using this account.</p><p>This is an account in your local Laravel app. It is separate from the learning website, which saves your lesson progress in your browser.</p>"
      },
      {
        "type": "check",
        "text": "You have created a test account at <code>/register</code>, seen the dashboard, logged out and successfully logged back in at <code>/login</code>. You should now be signed in. You can also open phpMyAdmin and find the new entry in the <code>users</code> table."
      },
      {
        "type": "help",
        "text": "If something fails, read the error message and check the file or command used in this step. For route problems try php artisan route:list; for failing tests try php artisan test. Check spelling, namespaces, method names and database relationships before moving on."
      }
    ],
    "q": "Why add Breeze before protected catalogue pages?",
    "options": [
      "It is a replacement for Composer.",
      "It automatically populates the book catalogue.",
      "It supplies account routes, session handling and layouts used by the finished application."
    ],
    "answer": 2,
    "feedback": "It supplies account routes, session handling and layouts used by the finished application."
  },
  {
    "id": "m03-s02",
    "module": 3,
    "title": "Create factories for reliable sample records",
    "time": "35–45 min",
    "intro": "Create sample books, authors and reviews automatically instead of entering each one by hand.",
    "parts": [
      {
        "type": "text",
        "title": "What you will build",
        "text": "<p><strong>Your task:</strong> Create BookFactory, AuthorFactory and ReviewFactory. Use Faker for sensible values and practise creating one model from tinker.</p>"
      },
      {
        "type": "text",
        "title": "Further reading",
        "text": "<p><a href=\"https://john-dempsey.github.io/book-reviews-student/seeding-and-browsing/writing-factories.html\" target=\"_blank\" rel=\"noopener\">Read the related tutorial topic: seeding and browsing/writing factories</a>.</p>"
      },
      {
        "type": "text",
        "title": "Writing factories",
        "text": "<p>Every row you've created so far has been typed out by hand. The model\ntests from the last topic built a <code>Book</code> like this:</p>"
      },
      {
        "type": "code",
        "file": "tests/Unit/BookTest.php",
        "text": "$book = Book::create([\n    'title' => 'The Pragmatic Programmer',\n    'year' => 1999,\n]);"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>That's fine for proving a schema works - one or two rows, with values you\nchose because they made the test's point. It falls apart the moment you\nwant twenty books that don't all look suspiciously identical, or just\nwant <em>something</em> in the database to look at while building a page,\nwithout caring what its title actually is. A <strong>factory</strong> is a class that\nknows how to produce one plausible-looking row for a model, as many\ntimes as you ask for it.</p>"
      },
      {
        "type": "text",
        "title": "Creating a factory",
        "text": "<p>Generate a factory for each of the three models. Run these commands from your Laravel project directory. Laravel creates the corresponding PHP files in <code>database/factories/</code>.</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "php artisan make:factory AuthorFactory --model=Author\nphp artisan make:factory BookFactory --model=Book\nphp artisan make:factory ReviewFactory --model=Review"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "<?php\n\nnamespace Database\\Factories;\n\nuse App\\Models\\Author;\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\n\n/**\n * @extends Factory<Author>\n */\nclass AuthorFactory extends Factory\n{\n    /**\n     * Define the model's default state.\n     *\n     * @return array<string, mixed>\n     */\n    public function definition(): array\n    {\n        return [\n            //\n        ];\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Each generated factory begins with an empty <code>definition()</code> method. This method returns the attributes Laravel uses to build sample records. Add the <code>HasFactory</code> trait to each model, as shown below, so you can call <code>Author::factory()</code>, <code>Book::factory()</code> and <code>Review::factory()</code>. The <code>User</code> model already has the trait.</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "use Database\\Factories\\AuthorFactory;\nuse Illuminate\\Database\\Eloquent\\Factories\\HasFactory;\nuse Illuminate\\Database\\Eloquent\\Model;\n\nclass Author extends Model\n{\n    /** @use HasFactory<AuthorFactory> */\n    use HasFactory;\n\n    protected $fillable = [\n        // ...\n    ];\n}",
        "highlightLines": [
          1,
          7,
          11
        ]
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Add <code>HasFactory</code> to <code>Book</code> and <code>Review</code> in the same way. The factory classes and the model classes have different namespaces: factories live in <code>Database\\Factories</code>, while Eloquent models live in <code>App\\Models</code>. This matters when one factory uses another model.</p>"
      },
      {
        "type": "text",
        "title": "Filling in the definition",
        "text": "<p><code>definition()</code> returns an array of column-name =&gt; value, exactly like the\narrays you've been passing to <code>Model::create()</code> - the difference is every\nvalue here comes from <strong>Faker</strong>, a library that generates realistic-looking\nrandom data, via the <code>fake()</code> helper. <code>AuthorFactory</code> is the simplest one:</p>"
      },
      {
        "type": "code",
        "file": "database/factories/AuthorFactory.php",
        "text": "<?php\n\nnamespace Database\\Factories;\n\nuse App\\Models\\Author;\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\n\n/**\n * @extends Factory<Author>\n */\nclass AuthorFactory extends Factory\n{\n    /**\n     * Define the model's default state.\n     *\n     * @return array<string, mixed>\n     */\n    public function definition(): array\n    {\n        return [\n            'name' => fake()->name(),\n            'image' => null,\n            'bio' => fake()->paragraph(),\n        ];\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>fake()-&gt;name()</code> returns a plausible full name (a different one every\ncall), <code>fake()-&gt;paragraph()</code> a plausible paragraph of prose. <code>image</code> is\nleft <code>null</code> on purpose - nothing generates a real image file, and the\ncolumn is nullable.</p><p><code>BookFactory</code> leans on a few more of Faker's generators:</p>"
      },
      {
        "type": "code",
        "file": "database/factories/BookFactory.php",
        "text": "<?php\n\nnamespace Database\\Factories;\n\nuse App\\Models\\Book;\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\n\n/**\n * @extends Factory<Book>\n */\nclass BookFactory extends Factory\n{\n    /**\n     * Define the model's default state.\n     *\n     * @return array<string, mixed>\n     */\n    public function definition(): array\n    {\n        return [\n            'title' => rtrim(fake()->sentence(random_int(2, 5)), '.'),\n            'description' => fake()->paragraphs(3, true),\n            'year' => fake()->numberBetween(1950, (int) date('Y')),\n            'image' => null,\n            'isbn' => fake()->isbn13(),\n            'publisher' => fake()->company(),\n            'edition_number' => (string) fake()->numberBetween(1, 5),\n            'price' => fake()->randomFloat(2, 9.99, 79.99),\n        ];\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Worth pausing on a couple of these:</p><ul>\n<li><code>fake()-&gt;sentence(2, 5)</code> produces a short sentence like <em>\"Voluptas et\nfugiat.\"</em> - it always ends in a full stop, which reads oddly as a book\ntitle, so <code>rtrim(..., '.')</code> strips it back off.</li>\n<li><code>year</code> is bounded between 1950 and <em>this actual year</em> (<code>date('Y')</code>,\ncast to an int) rather than a fixed upper limit that would quietly go\nstale - it always generates a plausible publication year, not a\nhardcoded one that ages badly.</li>\n<li><code>edition_number</code> is cast to a string with <code>(string)</code> because the column\nitself is a <code>string</code> in the migration (Part 1 keeps edition details as\nplain fields on <code>books</code>, rather than a separate editions table) -\n<code>numberBetween()</code> returns an <code>int</code>, and the factory's job is to match\nthe column's actual type.</li>\n</ul>"
      },
      {
        "type": "text",
        "title": "A factory that depends on other rows: ReviewFactory",
        "text": "<p>A review belongs to a book and is written by a user. Open <code>database/factories/ReviewFactory.php</code> and use the complete class below. Notice the <code>use App\\Models\\Book;</code> and <code>use App\\Models\\User;</code> lines: without these imports, PHP looks for the classes in the factory namespace, causing a “Class Database\\Factories\\Book not found” error.</p>"
      },
      {
        "type": "code",
        "file": "database/factories/ReviewFactory.php",
        "text": "<?php\n\nnamespace Database\\Factories;\n\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse App\\Models\\User;\nuse Illuminate\\Database\\Eloquent\\Factories\\Factory;\n\n/**\n * @extends Factory<Review>\n */\nclass ReviewFactory extends Factory\n{\n    /**\n     * Define the model's default state.\n     *\n     * A review always needs a book and a user - by default this makes a\n     * new one of each, but the seeder overrides both so that reviews land\n     * on the books/users it already created instead.\n     *\n     * @return array<string, mixed>\n     */\n    public function definition(): array\n    {\n        return [\n            'book_id' => Book::factory(),\n            'user_id' => User::factory(),\n            'rating' => fake()->numberBetween(1, 5),\n            'comment' => fake()->boolean(80) ? fake()->paragraph() : null,\n        ];\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>book_id</code> and <code>user_id</code> aren't Faker values - they're <strong>other factories</strong>,\nnested inside this one. Ask for <code>Review::factory()-&gt;create()</code> with nothing\noverridden, and Eloquent doesn't just leave those columns empty: it runs\n<code>Book::factory()</code> and <code>User::factory()</code> first, creates a brand new book\nand a brand new user to go with them, and only then creates the review\npointing at both. That's a sensible default for a factory used on its\nown - it always produces a complete, valid row, never a review with a\n<code>book_id</code> pointing nowhere - even though it's rarely what you actually\nwant once specific books and users already exist to attach reviews to\ninstead.</p><p><code>comment</code> shows a different kind of variation: <code>fake()-&gt;boolean(80)</code>\nreturns <code>true</code> about 80% of the time, so most reviews get a written\ncomment and some are left with just a star rating - <code>null</code>, since the\ncolumn is nullable.</p>"
      },
      {
        "type": "text",
        "title": "Check your factory imports",
        "text": "<p>Before trying these factories in Tinker, check that the <code>ReviewFactory</code> header imports <code>App\\Models\\Book</code> and <code>App\\Models\\User</code>. The same applies to the model imports in the other factory files. Save your changes before running the commands below.</p>"
      },
      {
        "type": "text",
        "title": "Using a factory",
        "text": "<p>Every factory gives you the same handful of methods, regardless of which\nmodel it belongs to.</p><p><strong><code>create()</code></strong> builds a model instance <em>and</em> saves it to the database\nstraight away:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "Author::factory()->create();"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><strong><code>count()</code></strong> (or the shorthand of passing a number straight to\n<code>factory()</code>) makes several at once:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "Book::factory()->count(3)->create();\nBook::factory(3)->create();   // same thing"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><strong>Overriding attributes</strong> - pass an array to <code>create()</code>, same as\n<code>Model::create()</code>, and only those keys are pinned; everything else still\ncomes from <code>definition()</code>:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "Book::factory()->create(['title' => 'Dune']);"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Handy when a test cares about one specific value (a known title to search\nfor, say) but doesn't care what the rest of the row looks like.</p><p><strong><code>make()</code></strong> is <code>create()</code>'s quieter sibling - it builds the model object\nwith the same fake attributes but never saves it, so nothing touches the\ndatabase:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "$book = Book::factory()->make();   // in memory only, not in `books`"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Rarely what you want for a book or author, since there's nothing to look\nat until it's actually saved - but worth knowing it exists, and that\n<code>create()</code> is really just <code>make()</code> plus a <code>save()</code> call, the same\nrelationship your own Active-Record-style classes had between building an\nobject and persisting it.</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "$ php artisan tinker\n> \\App\\Models\\Author::factory()->create();\n= App\\Models\\Author {#7842\n    name: \"Dr. Providenci Wolf\",\n    image: null,\n    bio: \"Quia rerum et dolores nam. Vitae nihil quod...\",\n    id: 1,\n    updated_at: \"2026-09-15 10:03:41\",\n    created_at: \"2026-09-15 10:03:41\",\n  }\n> \\App\\Models\\Book::factory()->create(['title' => 'Dune']);\n= App\\Models\\Book {#7869\n    title: \"Dune\",\n    description: \"Sunt magni ex nihil...\",\n    year: 1998,\n    image: null,\n    isbn: \"978-1-4028-9462-6\",\n    publisher: \"Kunde-Bahringer\",\n    edition_number: \"3\",\n    price: \"42.17\",\n    id: 1,\n    updated_at: \"2026-09-15 10:04:02\",\n    created_at: \"2026-09-15 10:04:02\",\n  }\n> \\App\\Models\\Review::factory()->create();"
      },
      {
        "type": "text",
        "title": "Trying it out with tinker",
        "text": "<p>Every value except <code>title</code> above is Faker's doing, and will be different\nevery time you run it yourself - that last <code>Review::factory()-&gt;create()</code>\nis worth trying and then checking <code>books</code> and <code>users</code> in phpMyAdmin\nafterwards: a brand new book and a brand new user will have appeared,\nneither of which you asked for by name, exactly as the nested-factory\nbehaviour above describes.</p>"
      },
      {
        "type": "text",
        "title": "What's still missing",
        "text": "<p>Every row created so far - in <code>tinker</code>, in last lesson's tests, and\nabove - has existed one at a time, created because someone typed a\ncommand. Nothing yet produces a whole catalogue in one go: a fixed number\nof users and authors, books attached to the right authors, reviews\nattached to the right books and users, in the kind of quantity and shape\na real (if fictional) book review site would actually have. That's the\nnext topic's job.</p>"
      },
      {
        "type": "check",
        "text": "A BookFactory can make a valid Book independently of manually inserting a row."
      },
      {
        "type": "help",
        "text": "If something fails, read the error message and check the file or command used in this step. For route problems try php artisan route:list; for failing tests try php artisan test. Check spelling, namespaces, method names and database relationships before moving on."
      }
    ],
    "q": "What is a factory for?",
    "options": [
      "It copies every production account.",
      "It generates repeatable test or demo records with realistic defaults.",
      "It permanently schedules cron jobs."
    ],
    "answer": 1,
    "feedback": "It generates repeatable test or demo records with realistic defaults."
  },
  {
    "id": "m03-s03",
    "module": 3,
    "title": "Write and run the seeders",
    "time": "35–50 min",
    "intro": "Add sample records to your database so there is something to browse in your app.",
    "parts": [
      {
        "type": "text",
        "title": "What you will build",
        "text": "<p><strong>Your task:</strong> Create the four seeder classes, add the complete PHP code to each file, and register them in <code>DatabaseSeeder</code>. You will then populate the database with five users, five authors, twenty books and sixty reviews.</p>"
      },
      {
        "type": "text",
        "title": "Further reading",
        "text": "<p><a href=\"https://john-dempsey.github.io/book-reviews-student/seeding-and-browsing/seeders-and-demo-data.html\" target=\"_blank\" rel=\"noopener\">Read the related tutorial topic: seeding and browsing/seeders and demo data</a>.</p>"
      },
      {
        "type": "text",
        "title": "Seeders and demo data",
        "text": "<p>Everything the last topic built - <code>AuthorFactory</code>, <code>BookFactory</code>,\n<code>ReviewFactory</code> - still only runs when someone types a command in\n<code>tinker</code>. Nothing produces the whole catalogue at once: a fixed number of\nusers and authors, books attached to the right authors, reviews attached\nto the right books and users, all in one go. That's what a <strong>seeder</strong>\ndoes - a class that scripts a batch of factory calls (and whatever else\nis needed) into one repeatable command.</p>"
      },
      {
        "type": "text",
        "title": "Create the seeder files",
        "text": "<p>From the Laravel project directory, generate one seeder for each set of records. These commands create PHP files in <code>database/seeders</code>; they do not insert records yet.</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "php artisan make:seeder UserSeeder\nphp artisan make:seeder AuthorSeeder\nphp artisan make:seeder BookSeeder\nphp artisan make:seeder ReviewSeeder"
      },
      {
        "type": "text",
        "title": "Add the UserSeeder code",
        "text": "<p>Open <code>database/seeders/UserSeeder.php</code> and replace its contents with the complete example below. The line <code>use App\\Models\\User;</code> is important: without it, PHP looks for a class called <code>Database\\Seeders\\User</code>, which does not exist.</p>"
      },
      {
        "type": "code",
        "file": "database/seeders/UserSeeder.php",
        "text": "<?php\n\nnamespace Database\\Seeders;\n\nuse App\\Models\\User;\nuse Illuminate\\Database\\Seeder;\n\nclass UserSeeder extends Seeder\n{\n    /**\n     * Seed the users table.\n     *\n     * Five fixed, named accounts rather than random ones - easier to\n     * recognise while browsing the seeded catalogue, and to log in as\n     * while testing.\n     */\n    public function run(): void\n    {\n        $users = [\n            ['name' => 'Emma Watson', 'email' => 'emma.watson84@example.com'],\n            ['name' => \"Liam O'Connor\", 'email' => 'liam.oconnor22@example.com'],\n            ['name' => 'Sophia Chen', 'email' => 'sophia.chen91@example.com'],\n            ['name' => 'Carlos Silva', 'email' => 'carlos.silva33@example.com'],\n            ['name' => 'Aisha Patel', 'email' => 'aisha.patel55@example.com'],\n        ];\n\n        foreach ($users as $user) {\n            User::factory()->create($user);\n        }\n    }\n}"
      },
      {
        "type": "text",
        "title": "Add the AuthorSeeder code",
        "text": "<p>Next, open <code>database/seeders/AuthorSeeder.php</code>. This seeder uses <code>AuthorFactory</code> to create five authors. Notice that it imports <code>App\\Models\\Author</code>.</p>"
      },
      {
        "type": "code",
        "file": "database/seeders/AuthorSeeder.php",
        "text": "<?php\n\nnamespace Database\\Seeders;\n\nuse App\\Models\\Author;\nuse Illuminate\\Database\\Seeder;\n\nclass AuthorSeeder extends Seeder\n{\n    /**\n     * Seed the authors table.\n     */\n    public function run(): void\n    {\n        Author::factory(5)->create();\n    }\n}"
      },
      {
        "type": "text",
        "title": "Add the BookSeeder code",
        "text": "<p>In <code>database/seeders/BookSeeder.php</code>, create twenty books and connect them to the authors already in the database. Every book receives one author, and two randomly selected books receive a second author. Both model imports are required.</p>"
      },
      {
        "type": "code",
        "file": "database/seeders/BookSeeder.php",
        "text": "<?php\n\nnamespace Database\\Seeders;\n\nuse App\\Models\\Author;\nuse App\\Models\\Book;\nuse Illuminate\\Database\\Seeder;\n\nclass BookSeeder extends Seeder\n{\n    /**\n     * Seed the books table.\n     *\n     * Books are a weak entity here - a book is meaningless without at\n     * least one author to attach to the author_book pivot - so this must\n     * run after AuthorSeeder.\n     */\n    public function run(): void\n    {\n        $authors = Author::all();\n\n        $books = Book::factory(20)->create();\n\n        // Most books have a single author.\n        $books->each(function (Book $book) use ($authors) {\n            $book->authors()->attach($authors->random());\n        });\n\n        // A couple of books are co-written - attach a second, different\n        // author to two randomly chosen books.\n        $books->random(2)->each(function (Book $book) use ($authors) {\n            $firstAuthorId = $book->authors->first()->id;\n\n            $secondAuthor = $authors\n                ->reject(fn (Author $author) => $author->id === $firstAuthorId)\n                ->random();\n\n            $book->authors()->attach($secondAuthor);\n        });\n    }\n}"
      },
      {
        "type": "text",
        "title": "Add the ReviewSeeder code",
        "text": "<p>Open <code>database/seeders/ReviewSeeder.php</code>. It uses existing books and users, rather than creating new ones for each review. The full class below includes imports for <code>Book</code>, <code>Review</code> and <code>User</code>.</p>"
      },
      {
        "type": "code",
        "file": "database/seeders/ReviewSeeder.php",
        "text": "<?php\n\nnamespace Database\\Seeders;\n\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse App\\Models\\User;\nuse Illuminate\\Database\\Seeder;\n\nclass ReviewSeeder extends Seeder\n{\n    /**\n     * Seed the reviews table.\n     *\n     * Reviews are the weakest entity of all - each one belongs to both a\n     * book and a user - so this must run after BookSeeder and\n     * UserSeeder.\n     *\n     * Every book gets between 0 and 5 reviews, one per user at most\n     * (the reviews table has a unique index on book_id + user_id, so a\n     * user can't review the same book twice), and at least two books end\n     * up with no reviews at all. The counts below always add up to 60;\n     * shuffling them means it isn't always the same books left without\n     * reviews.\n     */\n    public function run(): void\n    {\n        $users = User::all();\n        $books = Book::all();\n\n        $reviewCounts = [\n            0, 0,\n            5, 5, 5, 5,\n            4, 4, 4, 4,\n            3, 3, 3, 3,\n            2, 2, 2, 2, 2, 2,\n        ];\n        shuffle($reviewCounts);\n\n        $books->each(function (Book $book, int $index) use ($users, $reviewCounts) {\n            $reviewerCount = $reviewCounts[$index];\n\n            if ($reviewerCount === 0) {\n                return;\n            }\n\n            $users->random($reviewerCount)->each(function (User $user) use ($book) {\n                Review::factory()->create([\n                    'book_id' => $book->id,\n                    'user_id' => $user->id,\n                ]);\n            });\n        });\n    }\n}"
      },
      {
        "type": "text",
        "title": "Register the seeders",
        "text": "<p>Finally, open the existing <code>database/seeders/DatabaseSeeder.php</code> and replace its contents with the example below. Laravel runs these seeders in the order listed, so users and authors exist before books and reviews need them. This file does <strong>not</strong> need to import the <code>User</code> model: it calls the <code>UserSeeder</code> class, which performs that work.</p>"
      },
      {
        "type": "code",
        "file": "database/seeders/DatabaseSeeder.php",
        "text": "<?php\n\nnamespace Database\\Seeders;\n\nuse Illuminate\\Database\\Console\\Seeds\\WithoutModelEvents;\nuse Illuminate\\Database\\Seeder;\n\nclass DatabaseSeeder extends Seeder\n{\n    use WithoutModelEvents;\n\n    /**\n     * Seed the application's database.\n     *\n     * Order matters: the strong entities (users, authors) are seeded\n     * first, since the weak entities that follow (books, then reviews)\n     * depend on rows already existing to attach to - a book needs an\n     * author, and a review needs both a book and a user.\n     */\n    public function run(): void\n    {\n        $this->call([\n            UserSeeder::class,\n            AuthorSeeder::class,\n            BookSeeder::class,\n            ReviewSeeder::class,\n        ]);\n    }\n}"
      },
      {
        "type": "text",
        "title": "Check your files before running",
        "text": "<p>You should now have five seeder files: <code>UserSeeder.php</code>, <code>AuthorSeeder.php</code>, <code>BookSeeder.php</code>, <code>ReviewSeeder.php</code> and <code>DatabaseSeeder.php</code>. Each begins with <code>namespace Database\\Seeders;</code>; each model referenced by its short name has a corresponding <code>use App\\Models\\…;</code> import. The short class names for the seeders inside <code>DatabaseSeeder</code> work because those classes are in the same <code>Database\\Seeders</code> namespace.</p>"
      },
      {
        "type": "text",
        "title": "Why that order isn't arbitrary",
        "text": "<p>Swap two of those lines - say, run <code>BookSeeder</code> before <code>AuthorSeeder</code> -\nand seeding fails immediately:</p>"
      },
      {
        "type": "code",
        "file": "Example output",
        "text": "Database\\Seeders\\BookSeeder ........................................ RUNNING\n\nInvalidArgumentException\n\nYou requested 1 items, but there are only 0 items available.\n\nat database/seeders/BookSeeder.php:26"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>BookSeeder</code> asks for <code>Author::all()</code> and then attaches a random one to\nevery book. Run it before <code>AuthorSeeder</code>, and <code>Author::all()</code> comes back\nempty - there's nothing yet to pick a random one <em>from</em>. The rule this\nfollows is the same one from designing the schema back in Lesson 1:\n<strong>strong entities before the weak entities that depend on them.</strong> Users\nand authors don't need anything else to exist first; books do (an\nauthor, to attach to); reviews depend on the most, needing both a book\nand a user already in place. Seed in that order - users, authors, books,\nreviews - and every later seeder finds exactly what it needs already\nsitting in the database.</p>"
      },
      {
        "type": "text",
        "title": "BookSeeder : attaching authors that already exist",
        "text": "<p><code>$authors = Author::all()</code> only makes sense given the ordering rule\nabove - it's the five rows <code>AuthorSeeder</code> already created. Twenty books\nget created first, unattached to anyone; then every book gets exactly\none random existing author attached via <code>$book-&gt;authors()-&gt;attach()</code>,\nthe same many-to-many method from the Eloquent relationships topic.\nTwo books, chosen at random, get a <em>second</em> author attached afterwards -\n<code>reject()</code> filters that second pick down to authors who aren't already\nattached to this particular book, so a book can never end up \"co-written\"\nwith itself.</p>"
      },
      {
        "type": "text",
        "title": "ReviewSeeder : working around the factory's own default",
        "text": "<p>Last topic's <code>ReviewFactory</code> gives <code>book_id</code> and <code>user_id</code> a default\nworth revisiting here:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "// ReviewFactory.php\n'book_id' => Book::factory(),\n'user_id' => User::factory(),"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>That default is exactly what makes <code>Review::factory()-&gt;create()</code> useful\non its own in <code>tinker</code> - it always produces a complete row, inventing a\nbook and a user to go with it if none are supplied. Inside a seeder,\nthat's the opposite of helpful. Twenty books and five users already\nexist, created on purpose, in a specific quantity - a review seeder that\nlet every review invent its <em>own</em> extra book and user would blow both\nthose numbers open. It's easy to see happen:</p>"
      },
      {
        "type": "code",
        "file": "Code example",
        "text": "> App\\Models\\Book::count(); App\\Models\\User::count();\n= 20\n= 5\n> App\\Models\\Review::factory()->create();\n> App\\Models\\Book::count(); App\\Models\\User::count();\n= 21\n= 6"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>One unguarded <code>Review::factory()-&gt;create()</code> call, and there's a 21st book\nand a 6th user that nobody asked for. <code>ReviewSeeder</code> avoids this by never\ncalling <code>Review::factory()-&gt;create()</code> without overriding both foreign\nkeys:</p>"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Passing <code>'book_id' =&gt; $book-&gt;id</code> and <code>'user_id' =&gt; $user-&gt;id</code> overrides\nthe factory's defaults completely - <code>Book::factory()</code> and\n<code>User::factory()</code> never run, because the values they'd have filled in\nare already supplied. Only <code>rating</code> and <code>comment</code> still come from\n<code>ReviewFactory</code>'s own Faker calls.</p><p>The rest of the method controls <em>how many</em> reviews land on each book.\n<code>$reviewCounts</code> is twenty numbers, one per book, that always add up to\nsixty and stay within 0-5; <code>shuffle()</code> means it isn't always the same two\nbooks that end up with none. For whichever count a given book gets,\n<code>$users-&gt;random($reviewerCount)</code> picks that many <em>different</em> users out of\nthe five - never the same user twice for the same book, which matters\nbecause <code>reviews</code> has a unique index on <code>book_id</code> + <code>user_id</code> (from the\nmigrations topic back in Lesson 1) that would reject a second review by\nthe same user on the same book outright.</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "php artisan migrate:fresh --seed"
      },
      {
        "type": "text",
        "title": "Running it",
        "text": "<p>For a <strong>disposable local development database</strong>, <code>migrate:fresh --seed</code> drops all tables, recreates them and runs <code>DatabaseSeeder</code>. It <strong>deletes existing data</strong>, so do not use it on any database you need to preserve. Alternatively, <code>php artisan db:seed</code> runs only the seeders, without recreating tables. Because these seeders use fixed user email addresses, running them twice against the same data will produce a duplicate-email error.</p>"
      },
      {
        "type": "code",
        "file": "Example output",
        "text": "Illuminate\\Database\\UniqueConstraintViolationException\n\nSQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry\n'emma.watson84@example.com' for key 'users.users_email_unique'"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>UserSeeder</code> tries to insert <code>emma.watson84@example.com</code> again, and the\nsame unique constraint that stops two people registering with the same\nemail stops the seeder too. While working on just one seeder, <code>db:seed --class=</code> targets a single one instead of the whole batch - handy for,\nsay, tweaking <code>BookSeeder</code> without waiting on <code>UserSeeder</code> and\n<code>AuthorSeeder</code> to run again first:</p>"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "php artisan db:seed --class=BookSeeder"
      },
      {
        "type": "code",
        "file": "Terminal",
        "text": "$ php artisan tinker\n> App\\Models\\User::count();\n= 5\n> App\\Models\\Author::count();\n= 5\n> App\\Models\\Book::count();\n= 20\n> App\\Models\\Review::count();\n= 60\n> App\\Models\\Book::has('authors', '>=', 2)->count();\n= 2\n> App\\Models\\Book::doesntHave('reviews')->count();\n= 2"
      },
      {
        "type": "text",
        "title": "Checking the result",
        "text": "<p>Five users, five authors, twenty books, sixty reviews, two co-written\nbooks, two books with no reviews yet - exactly the shape this topic set\nout to build, and all of it reproducible from nothing with one command.</p>"
      },
      {
        "type": "text",
        "title": "Confirm the records in phpMyAdmin",
        "text": "<p>Open phpMyAdmin and select the database configured for your Laravel project. Check that the <code>users</code> and <code>authors</code> tables contain five rows each, <code>books</code> contains twenty and <code>reviews</code> contains sixty. Open <code>author_book</code> to see the links between books and authors. If you have run Tinker experiments earlier, you may see extra rows until you reset your disposable database.</p>"
      },
      {
        "type": "text",
        "title": "What's still missing",
        "text": "<p>The catalogue is real now, but there's still no way to actually browse\nit - no page lists the books, no page shows one book's authors and\nreviews. That's this lesson's next topic.</p>"
      },
      {
        "type": "check",
        "text": "The catalogue has books linked to authors and reviews connected to users and books."
      },
      {
        "type": "help",
        "text": "If something fails, read the error message and check the file or command used in this step. For route problems try php artisan route:list; for failing tests try php artisan test. Check spelling, namespaces, method names and database relationships before moving on."
      }
    ],
    "q": "Why are authors and users seeded before reviews?",
    "options": [
      "The later records need valid foreign keys to rows that already exist.",
      "Because MySQL requires alphabetic table order.",
      "Because reviews generate the users and books they reference."
    ],
    "answer": 0,
    "feedback": "The later records need valid foreign keys to rows that already exist."
  },
  {
    "id": "m03-s04",
    "module": 3,
    "title": "Inspect relationships and seeded data",
    "time": "20–30 min",
    "intro": "Use phpMyAdmin and Laravel to check that your sample records are linked correctly.",
    "parts": [
      {
        "type": "text",
        "title": "Check the populated database",
        "text": "<p>In the previous two activities you wrote factories and seeders. Now inspect the records they produced. Start with the data you already seeded: there is no need to run <code>migrate:fresh --seed</code> again simply to inspect it, because that command deletes and recreates your tables.</p>"
      },
      {
        "type": "text",
        "title": "Browse the rows in phpMyAdmin",
        "text": "<p>Open <a href=\"http://localhost:8081\" target=\"_blank\" rel=\"noopener\">phpMyAdmin</a> and select <code>book_reviews</code>. Open <code>books</code>, <code>authors</code>, <code>author_book</code>, <code>users</code> and <code>reviews</code>. Identify a book ID in <code>books</code>, find that ID in <code>author_book</code>, and follow its <code>author_id</code> back to an author. In <code>reviews</code>, follow a review’s <code>book_id</code> and <code>user_id</code> to the related records.</p>"
      },
      {
        "type": "text",
        "title": "Inspect the same relationships using Tinker",
        "text": "<p>Use Tinker to ask Eloquent for a book and its authors. The code loads both sides of the link for you. Read the IDs and names in the output, then compare them with what you saw in phpMyAdmin.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace",
        "text": "php artisan tinker"
      },
      {
        "type": "code",
        "file": "Tinker · PHP statements",
        "text": "$book = \\App\\Models\\Book::with('authors', 'reviews.user')->first();\n$book?->title;\n$book?->authors->pluck('name');\n$book?->reviews->pluck('rating');"
      },
      {
        "type": "text",
        "title": "Check the counts",
        "text": "<p>Confirm that the seeders produced records in each main table. Your counts depend on the number of times you have run seeders or used Tinker, so do not expect the numbers to match perfectly if you have already added rows by hand.</p>"
      },
      {
        "type": "code",
        "file": "Tinker · PHP statements",
        "text": "\\App\\Models\\Book::count();\n\\App\\Models\\Author::count();\n\\App\\Models\\User::count();\n\\App\\Models\\Review::count();"
      },
      {
        "type": "text",
        "title": "Questions to answer",
        "text": "<p>Choose one book with reviews. Which user wrote one of those reviews? Can you find that user’s name through <code>$review-&gt;user</code>? Does <code>$book-&gt;authors</code> match the rows in <code>author_book</code>? These checks demonstrate the difference between the underlying foreign keys and the relationships Eloquent makes available in PHP.</p>"
      },
      {
        "type": "check",
        "text": "You can trace at least one book to its author(s), and one review to its book and user, both in phpMyAdmin and Tinker."
      },
      {
        "type": "help",
        "text": "If something fails, read the error message and check the file or command used in this step. For route problems try php artisan route:list; for failing tests try php artisan test. Check spelling, namespaces, method names and database relationships before moving on."
      }
    ],
    "q": "What does with(\"authors\") change?",
    "options": [
      "It deletes previously loaded author records.",
      "It turns all authors into strings.",
      "It eager-loads the authors relationship along with the book."
    ],
    "answer": 2,
    "feedback": "It eager-loads the authors relationship along with the book."
  },
  {
    "id": "m04-s01",
    "module": 4,
    "title": "Create the catalogue routes and controllers",
    "time": "25 min",
    "intro": "Add the book and author web addresses, then connect them to the controllers that will handle each page.",
    "parts": [
      {
        "type": "text",
        "title": "What you will do",
        "text": "<p>In Module 01 you created a temporary <code>GET /books</code> route. During Module 03 you installed Laravel Breeze with Blade. That installation can replace or rewrite <code>routes/web.php</code>, so your earlier route <strong>may already be gone</strong>.</p><p>In this activity you will create <code>BookController</code> and <code>AuthorController</code>, then add their routes alongside Breeze's existing routes. The Blade pages will be created in 04-02 and 04-03.</p>"
      },
      {
        "type": "text",
        "title": "1. Generate the controllers",
        "text": "<p>From your terminal <strong>inside the workspace container</strong>, in the Laravel application folder (the same place you ran earlier Artisan commands), run:</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan make:controller BookController\nphp artisan make:controller AuthorController"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Laravel creates <code>app/Http/Controllers/BookController.php</code> and <code>app/Http/Controllers/AuthorController.php</code>. In your project folder on your computer these are under <code>src/app/Http/Controllers/</code>. Open each file in your editor.</p>"
      },
      {
        "type": "text",
        "title": "2. Implement BookController",
        "text": "<p>Replace the contents of <code>src/app/Http/Controllers/BookController.php</code> with the complete class below. The <code>use App\\Models\\Book;</code> import is required for the <code>Book</code> model.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Http/Controllers/BookController.php",
        "text": "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Book;\n\nclass BookController extends Controller\n{\n    public function index()\n    {\n        $books = Book::with('authors')\n            ->withCount('reviews')\n            ->withAvg('reviews', 'rating')\n            ->orderBy('title')\n            ->paginate(12);\n\n        return view('books.index', compact('books'));\n    }\n\n    public function show(Book $book)\n    {\n        $book->load(['authors', 'reviews.user']);\n\n        return view('books.show', compact('book'));\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>index()</code> retrieves books in title order, with their authors, number of reviews and average rating. <code>paginate(12)</code> returns twelve books per page. <code>show(Book $book)</code> receives a book through <strong>route model binding</strong> and loads its authors and reviews (including each reviewer).</p><p>The <code>view(...)</code> calls refer to <code>books/index.blade.php</code> and <code>books/show.blade.php</code>. We will prepare these templates in 04-02. Your original beginner <code>books/index.blade.php</code> might still exist, but is not yet the catalogue view this controller expects.</p>"
      },
      {
        "type": "text",
        "title": "3. Implement AuthorController",
        "text": "<p>Open <code>src/app/Http/Controllers/AuthorController.php</code> and replace its contents with this complete class:</p>"
      },
      {
        "type": "code",
        "file": "src/app/Http/Controllers/AuthorController.php",
        "text": "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Author;\n\nclass AuthorController extends Controller\n{\n    public function index()\n    {\n        $authors = Author::withCount('books')\n            ->orderBy('name')\n            ->paginate(12);\n\n        return view('authors.index', compact('authors'));\n    }\n\n    public function show(Author $author)\n    {\n        $author->load(['books' => function ($query) {\n            $query->with('authors')\n                ->withCount('reviews')\n                ->withAvg('reviews', 'rating');\n        }]);\n\n        return view('authors.show', compact('author'));\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>index()</code> fetches authors and their book counts. <code>show(Author $author)</code> loads the selected author’s books, including the details that the book-card template will need. Laravel will use the <code>{author}</code> URL segment to find the correct model.</p>"
      },
      {
        "type": "text",
        "title": "4. Add catalogue routes to the Breeze routes file",
        "text": "<p>Open <code>src/routes/web.php</code> in your editor. Find the routes Breeze created, including the dashboard, profile routes and the <code>require __DIR__.'/auth.php';</code> statement near the bottom.</p><p>First check whether the temporary <code>Route::get('/books', function () { ... });</code> from Module 01 is still present. If you find it, remove <em>just that route</em> so it will not conflict with the new <code>books.index</code> route. If it has disappeared after installing Breeze, there is nothing to remove.</p><p>Add these two imports near the top, alongside <code>ProfileController</code>:</p>"
      },
      {
        "type": "code",
        "file": "src/routes/web.php · imports",
        "text": "use App\\Http\\Controllers\\AuthorController;\nuse App\\Http\\Controllers\\BookController;"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Next, find the existing <code>Route::middleware('auth')->group(function () {</code> block created when you installed Breeze. Keep its profile routes and <strong>add the two new resource lines inside that same block</strong>, before its closing <code>});</code>. This example shows the whole block so you can see exactly where the new lines go:</p>"
      },
      {
        "type": "code",
        "file": "src/routes/web.php · authenticated routes",
        "text": "Route::middleware('auth')->group(function () {\n    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');\n    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');\n    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');\n\n    // New: read-only catalogue routes.\n    Route::resource('books', BookController::class)->only(['index', 'show']);\n    Route::resource('authors', AuthorController::class)->only(['index', 'show']);\n});"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><strong>Important:</strong> that is a single <code>auth</code> group, not a second group to paste below the existing one. You are adding two resource routes to the existing group. Leave <code>require __DIR__.'/auth.php';</code> at the bottom of <code>web.php</code>.</p><p><code>Route::resource()</code> can register seven standard routes, but <code>only(['index', 'show'])</code> registers just the two actions you have written for each controller. Create/edit/delete routes come later, when their methods exist.</p>"
      },
      {
        "type": "text",
        "title": "5. Confirm Laravel recognises the routes",
        "text": "<p>In your Laravel workspace terminal, run the commands below. They check the route definitions before any Blade templates have been created. If the routes appear here, Laravel knows where to send the requests.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan route:list --path=books\nphp artisan route:list --path=authors"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>You should see <code>GET|HEAD books</code> named <code>books.index</code>, <code>GET|HEAD books/{book}</code> named <code>books.show</code>, and the equivalent <code>authors.index</code> and <code>authors.show</code> entries. All four should point to their respective controller methods. There should be <strong>no duplicate temporary <code>GET /books</code> closure route</strong>.</p>"
      },
      {
        "type": "text",
        "title": "6. Understand the URL parameters",
        "text": "<p>A request to <code>/books/4</code> matches <code>books/{book}</code>. Laravel sees <code>show(Book $book)</code>, finds the <code>Book</code> with that ID, and passes it into the method. If no record exists, the framework returns 404. This is <strong>route model binding</strong>. Author routes work the same way with <code>{author}</code> and <code>Author $author</code>.</p><p>The routes are protected by <code>auth</code> middleware, so guests are redirected to login. <strong>Do not judge the result by visiting <code>/books</code> just yet:</strong> the new controller expects catalogue Blade views that you will create in 04-02 and 04-03. You may see a missing-view or undefined-variable error until then. For now the check is <code>route:list</code>.</p>"
      },
      {
        "type": "check",
        "text": "The two controllers exist, and route:list shows books.index, books.show, authors.index and authors.show once each. If a temporary /books route remained after Breeze, you have removed only that duplicate. Browser pages will follow in 04-02 and 04-03."
      },
      {
        "type": "help",
        "text": "If route:list reports “Target class ... does not exist”, check the two controller filenames and imports. If it shows a duplicate GET /books route, inspect web.php for the old closure route. If a browser request reports a missing Blade view, that is expected until 04-02 and 04-03."
      }
    ],
    "q": "What should happen to the temporary /books route from Module 01?",
    "options": [
      "Keep it alongside the new resource route.",
      "Remove it and register books.index/books.show inside the existing auth group.",
      "Remove the Laravel welcome page instead."
    ],
    "answer": 1,
    "feedback": "The old closure route must be replaced with the controller resource routes, not duplicated. route:list verifies they have been registered."
  },
  {
    "id": "m04-s02",
    "module": 4,
    "title": "Build the book index and detail pages",
    "time": "35–50 min",
    "intro": "Create the templates for a list of books and an individual book, then open both in your browser.",
    "parts": [
      {
        "type": "text",
        "title": "What you will create",
        "text": "<p><strong>Goal:</strong> create four Blade files: a book card, the book listing, a short review row and the book detail page. You will write the files in that order, then open <code>/books</code> and a particular book in your browser.</p><p>In your editor, paths start with <code>src/</code>. Inside the Laravel workspace container, the equivalent path starts with <code>resources/</code>.</p>"
      },
      {
        "type": "text",
        "title": "Before you start",
        "text": "<p>At this point you should have the <code>books.index</code> and <code>books.show</code> routes from 04-01, some books in the database from 03-03, and a user account for signing in. Keep Docker running. If you need to check routes again, use the command below.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan route:list --path=books"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>The two route names should be <code>books.index</code> and <code>books.show</code>. Opening them before the views exist may display an error; that's what this activity fixes. If you have no book records, check the <code>books</code> table in phpMyAdmin and revisit 03-03 before continuing.</p>"
      },
      {
        "type": "text",
        "title": "1. Add the placeholder image",
        "text": "<p>The catalogue uses a default cover whenever a book has no image. Download the <a href=\"starter-assets/book-placeholder.png\" download=\"book-placeholder.png\">book placeholder image</a> supplied with this learning site. In your Laravel project, create the folder <code>src/public/images/</code> if it doesn't exist, and save the file as <code>src/public/images/book-placeholder.png</code>.</p><p>In your browser, open <a href=\"http://localhost:8080/images/book-placeholder.png\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/images/book-placeholder.png</a>. You should see the placeholder image on its own. A 404 here means the file is not in the right <code>public/images</code> folder.</p>"
      },
      {
        "type": "text",
        "title": "2. Create the book card",
        "text": "<p>In <code>src/resources/views/</code>, create the folder <code>books/partials/</code>. Then create a new file named <strong><code>card.blade.php</code></strong> inside it. This is a partial: a reusable piece of markup that can display one book wherever it is included.</p><p>Use the complete file below; it expects a variable named <code>$book</code>. <code>BookController@index</code> has already loaded the authors, review count and average rating used here.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/partials/card.blade.php",
        "text": "<div class=\"bg-white overflow-hidden shadow-sm rounded-lg flex flex-col\">\n    <img src=\"{{ $book->image ? Storage::url($book->image) : asset('images/book-placeholder.png') }}\"\n         alt=\"Cover of {{ $book->title }}\"\n         class=\"w-full h-48 object-contain\">\n\n    <div class=\"p-4 flex flex-col grow\">\n        <h3 class=\"font-semibold text-lg text-gray-900\">\n            <a href=\"{{ route('books.show', $book) }}\" class=\"hover:underline\">\n                {{ $book->title }}\n            </a>\n        </h3>\n\n        <p class=\"text-sm text-gray-600 mt-1\">\n            {{ $book->authors->pluck('name')->join(', ') ?: 'Unknown author' }}\n            &middot; {{ $book->year }}\n        </p>\n\n        <p class=\"text-sm text-gray-500 mt-auto pt-2\">\n            @if ($book->reviews_count > 0)\n                {{ number_format($book->reviews_avg_rating, 1) }} / 5\n                ({{ $book->reviews_count }} {{ Str::plural('review', $book->reviews_count) }})\n            @else\n                No reviews yet\n            @endif\n        </p>\n    </div>\n</div>"
      },
      {
        "type": "text",
        "title": "3. Create the book listing",
        "text": "<p>Now create (or open) <code>src/resources/views/books/index.blade.php</code>. If an earlier version exists from Module 01, <strong>replace its contents</strong> with this listing. The filename corresponds to the controller's <code>view('books.index', ...)</code> call.</p><p><code>@forelse</code> repeats the card for each book, while <code>@empty</code> handles an empty database. <code>$books->links()</code> adds pagination. The shared <code>&lt;x-app-layout&gt;</code> component comes from the Breeze installation.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/index.blade.php",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ __('Books') }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-7xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\">\n                @forelse ($books as $book)\n                    @include('books.partials.card', ['book' => $book])\n                @empty\n                    <p class=\"text-gray-600 col-span-full\">No books in the catalogue yet.</p>\n                @endforelse\n            </div>\n\n            <div class=\"mt-6\">\n                {{ $books->links() }}\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "Check the listing in your browser",
        "text": "<p><strong>Browser checkpoint 1:</strong> Sign in at <a href=\"http://localhost:8080/login\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/login</a>, then visit <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books</a>. You should see a <em>Books</em> heading and cards showing titles, years and review counts. The placeholder cover should appear on each card.</p><p>You can click a title now to see whether the URL changes to <code>/books/1</code> (the number depends on the record). The detail page may still report <code>View [books.show] not found</code> until you complete the next two files.</p>"
      },
      {
        "type": "check",
        "text": "At http://localhost:8080/books, signed-in users see the book cards. The title links point to /books/{id}. If no cards appear, check your seeded books in phpMyAdmin."
      },
      {
        "type": "text",
        "title": "4. Create the review row",
        "text": "<p>Next create the folder <code>src/resources/views/reviews/partials/</code> and the file <code>review.blade.php</code> inside it. The book detail page will include one of these rows for every review. For now it only displays the review; edit and delete links are added when you implement those routes later.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/reviews/partials/review.blade.php",
        "text": "<div class=\"border-b border-gray-200 py-4 last:border-b-0\">\n    <div class=\"flex items-center justify-between\">\n        <span class=\"font-medium text-gray-900\">{{ $review->user->name }}</span>\n        <span class=\"text-sm text-gray-500\">{{ $review->rating }} / 5</span>\n    </div>\n\n    @if ($review->comment)\n        <p class=\"text-gray-700 mt-1\">{{ $review->comment }}</p>\n    @endif\n\n    <p class=\"text-xs text-gray-400 mt-1\">\n        {{ $review->created_at->format('d M Y') }}\n    </p>\n</div>"
      },
      {
        "type": "text",
        "title": "5. Create the book detail page",
        "text": "<p>Create <code>src/resources/views/books/show.blade.php</code>. This is the page returned by <code>BookController@show</code> when a signed-in user opens a URL such as <code>/books/1</code>.</p><p>It displays <code>$book</code>, its <code>authors</code> relationship and its <code>reviews</code> relationship. The controller already loads these. For now we show author names as text; in 04-03 you'll make them clickable once the author pages exist.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/show.blade.php",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ $book->title }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6 flex flex-col sm:flex-row gap-6\">\n                <img src=\"{{ $book->image ? Storage::url($book->image) : asset('images/book-placeholder.png') }}\"\n                     alt=\"Cover of {{ $book->title }}\"\n                     class=\"w-full sm:w-48 h-48 object-contain rounded-md\">\n\n                <div class=\"flex-1\">\n                    <p class=\"text-gray-700\">\n                        {{ $book->authors->pluck('name')->join(', ') ?: 'Unknown author' }}\n                        &middot; {{ $book->year }}\n                    </p>\n\n                    @if ($book->description)\n                        <p class=\"text-gray-800 mt-4\">{{ $book->description }}</p>\n                    @endif\n\n                    <dl class=\"grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 mt-4\">\n                        @if ($book->isbn)\n                            <dt class=\"font-medium\">ISBN</dt>\n                            <dd>{{ $book->isbn }}</dd>\n                        @endif\n                        @if ($book->publisher)\n                            <dt class=\"font-medium\">Publisher</dt>\n                            <dd>{{ $book->publisher }}</dd>\n                        @endif\n                        @if ($book->edition_number)\n                            <dt class=\"font-medium\">Edition</dt>\n                            <dd>{{ $book->edition_number }}</dd>\n                        @endif\n                        @if ($book->price)\n                            <dt class=\"font-medium\">Price</dt>\n                            <dd>&euro;{{ number_format($book->price, 2) }}</dd>\n                        @endif\n                    </dl>\n                </div>\n            </div>\n\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                <h3 class=\"font-semibold text-lg text-gray-900\">Reviews</h3>\n                <div class=\"mt-2\">\n                    @forelse ($book->reviews as $review)\n                        @include('reviews.partials.review', ['review' => $review])\n                    @empty\n                        <p class=\"text-gray-600\">No reviews yet.</p>\n                    @endforelse\n                </div>\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "Test the detail page in your browser",
        "text": "<p><strong>Browser checkpoint 2:</strong> Return to <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">/books</a>, click any title and inspect the detail page. You should see that book's title, author names, year, description (if present) and its reviews. If no reviews exist for that book, the page should say <em>No reviews yet</em>.</p><p>The detail page is intentionally read-only at this stage. Do not add buttons for <code>books.create</code>, <code>books.edit</code>, <code>books.destroy</code> or <code>books.reviews.create</code> yet: those routes will be built in later modules.</p>"
      },
      {
        "type": "check",
        "text": "Both /books and a book detail URL render successfully when signed in. Book cards show titles; a detail page shows book information and existing reviews. No link on these two pages depends on a not-yet-created create/edit/review route."
      },
      {
        "type": "help",
        "text": "If “View [books.index] not found” or “View [books.show] not found” appears, confirm the exact .blade.php name under src/resources/views/books/. If “View [books.partials.card] not found” appears, create src/resources/views/books/partials/card.blade.php. If reviews are listed but fail to render, verify src/resources/views/reviews/partials/review.blade.php. For any remaining stale view issue, run php artisan view:clear in the container."
      }
    ],
    "q": "Why use a card partial?",
    "options": [
      "It avoids duplicating the same book presentation in multiple views.",
      "It removes all model relationships.",
      "It automatically logs every user out."
    ],
    "answer": 0,
    "feedback": "It avoids duplicating the same book presentation in multiple views."
  },
  {
    "id": "m04-s03",
    "module": 4,
    "title": "Browse authors and handle missing covers",
    "time": "30–45 min",
    "intro": "Create the author pages and make it possible to move between books and their authors.",
    "parts": [
      {
        "type": "text",
        "title": "What you will create",
        "text": "<p><strong>Goal:</strong> create three more Blade files: an author card, an author listing and an author detail page. You'll then test both author routes and connect author names on the book detail page.</p><p>You already have <code>AuthorController</code> and the two author routes from 04-01. The book card created in 04-02 is reused here.</p>"
      },
      {
        "type": "text",
        "title": "1. Add the author placeholder",
        "text": "<p>Download the <a href=\"starter-assets/author-placeholder.png\" download=\"author-placeholder.png\">author placeholder image</a> and save it as <code>src/public/images/author-placeholder.png</code>, alongside the book placeholder from 04-02.</p><p>Check it by opening <a href=\"http://localhost:8080/images/author-placeholder.png\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/images/author-placeholder.png</a>. This should show an image, not a 404. Both images are used because seeded authors and books have no uploaded photos yet.</p>"
      },
      {
        "type": "text",
        "title": "2. Create the author card",
        "text": "<p>In <code>src/resources/views/</code>, create <code>authors/partials/</code>. Inside it create <strong><code>card.blade.php</code></strong>. It expects a single <code>$author</code> and displays their name and the book count loaded by <code>AuthorController@index</code>.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/authors/partials/card.blade.php",
        "text": "<div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-4 flex gap-4\">\n    <img src=\"{{ $author->image ?? asset('images/author-placeholder.png') }}\"\n         alt=\"{{ $author->name }}\"\n         class=\"w-16 h-16 rounded-full object-contain shrink-0\">\n\n    <div>\n        <h3 class=\"font-semibold text-lg text-gray-900\">\n            <a href=\"{{ route('authors.show', $author) }}\" class=\"hover:underline\">\n                {{ $author->name }}\n            </a>\n        </h3>\n\n        <p class=\"text-sm text-gray-500\">\n            {{ $author->books_count }} {{ Str::plural('book', $author->books_count) }}\n        </p>\n    </div>\n</div>"
      },
      {
        "type": "text",
        "title": "3. Create the author listing",
        "text": "<p>Create <code>src/resources/views/authors/index.blade.php</code>. This is the view named by <code>view('authors.index', compact('authors'))</code> in your controller. Notice the <code>@include('authors.partials.card', ...)</code>, which uses the file you just made.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/authors/index.blade.php",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ __('Authors') }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-7xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 gap-6\">\n                @forelse ($authors as $author)\n                    @include('authors.partials.card', ['author' => $author])\n                @empty\n                    <p class=\"text-gray-600 col-span-full\">No authors in the catalogue yet.</p>\n                @endforelse\n            </div>\n\n            <div class=\"mt-6\">\n                {{ $authors->links() }}\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "Check the author listing",
        "text": "<p><strong>Browser checkpoint 1:</strong> While signed in, open <a href=\"http://localhost:8080/authors\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/authors</a>. You should see the heading <em>Authors</em>, author names, book counts and the author placeholder. Clicking a name should take you to a URL like <code>/authors/2</code>. That detail URL will work after you add the next file.</p>"
      },
      {
        "type": "check",
        "text": "The /authors page renders, lists the seeded authors and links to /authors/{id}."
      },
      {
        "type": "text",
        "title": "4. Create the author detail page",
        "text": "<p>Create <code>src/resources/views/authors/show.blade.php</code>. The controller sends it one <code>$author</code> with an already-loaded collection of books. This view uses the <strong>book card partial from 04-02</strong>, so you do not need to create another book-card component.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/authors/show.blade.php",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ $author->name }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6 flex flex-col sm:flex-row gap-6\">\n                <img src=\"{{ $author->image ?? asset('images/author-placeholder.png') }}\"\n                     alt=\"{{ $author->name }}\"\n                     class=\"w-32 h-32 rounded-full object-contain shrink-0\">\n\n                @if ($author->bio)\n                    <p class=\"text-gray-800\">{{ $author->bio }}</p>\n                @endif\n            </div>\n\n            <div>\n                <h3 class=\"font-semibold text-lg text-gray-900 mb-4\">{{ __('Books') }}</h3>\n\n                <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\">\n                    @forelse ($author->books as $book)\n                        @include('books.partials.card', ['book' => $book])\n                    @empty\n                        <p class=\"text-gray-600 col-span-full\">No books by this author yet.</p>\n                    @endforelse\n                </div>\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "Check an author detail page",
        "text": "<p><strong>Browser checkpoint 2:</strong> Go back to <a href=\"http://localhost:8080/authors\" target=\"_blank\" rel=\"noopener\">/authors</a> and click an author's name. You should see their name, image, biography (if populated) and the books associated with that author. Click a book title. You should return to the book detail page created in 04-02.</p><p>Some authors may have no books; if so, the page will display <em>No books by this author yet</em> instead.</p>"
      },
      {
        "type": "text",
        "title": "5. Connect books and authors",
        "text": "<p>Now that the author pages exist, return to <code>src/resources/views/books/show.blade.php</code>. Find the paragraph that prints <code>$book->authors->pluck('name')->join(', ')</code> and the publication year. <strong>Replace just that paragraph</strong> with the code below. Each author's name now links to their author page.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/show.blade.php · replacement paragraph",
        "text": "<p class=\"text-gray-700\">\n    @forelse ($book->authors as $author)\n        <a href=\"{{ route('authors.show', $author) }}\" class=\"text-blue-600 hover:underline\">\n            {{ $author->name }}\n        </a>{{ !$loop->last ? ', ' : '' }}\n    @empty\n        Unknown author\n    @endforelse\n    &middot; {{ $book->year }}\n</p>"
      },
      {
        "type": "text",
        "title": "Follow the complete browsing path",
        "text": "<p><strong>Final browser check:</strong> Open <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">/books</a>, select a book with an author, click that author, then click the same book on the author's page. The links should take you <code>/books → /books/{id} → /authors/{id} → /books/{id}</code>.</p><p>There is no need to edit the navigation layout or add create/edit buttons yet. The next activity will automate some of the checks you have just made by hand.</p>"
      },
      {
        "type": "text",
        "title": "6. Add Books and Authors to the navigation",
        "text": "<p>You can open <code>/books</code> and <code>/authors</code> by typing their addresses, but the site still needs menu links so visitors can find them. Breeze starts with a <strong>Dashboard</strong> link. Now you will add <strong>Books</strong> and <strong>Authors</strong> beside it.</p><p>Open <code>src/resources/views/layouts/navigation.blade.php</code>. This layout has <strong>two</strong> sets of navigation links: one for wider screens and another for smaller screens. You need to update both. Keep the existing Dashboard link and all other layout code; you are only inserting the new links.</p>"
      },
      {
        "type": "text",
        "title": "Add the desktop links",
        "text": "<p>Find the <code>&lt;!-- Navigation Links --&gt;</code> comment near the top of the file. Immediately below it is a <code>&lt;div class=\"hidden space-x-8 ...\"&gt;</code> with the Dashboard <code>&lt;x-nav-link&gt;</code>. <strong>Directly after the closing <code>&lt;/x-nav-link&gt;</code> for Dashboard</strong>, paste the two links below. Do not add a second navigation <code>&lt;div&gt;</code>.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/layouts/navigation.blade.php · add after desktop Dashboard link",
        "text": "<x-nav-link :href=\"route('books.index')\" :active=\"request()->routeIs('books.*')\">\n    {{ __('Books') }}\n</x-nav-link>\n<x-nav-link :href=\"route('authors.index')\" :active=\"request()->routeIs('authors.*')\">\n    {{ __('Authors') }}\n</x-nav-link>"
      },
      {
        "type": "text",
        "title": "Add the mobile links",
        "text": "<p>Further down, find <code>&lt;!-- Responsive Navigation Menu --&gt;</code>. Inside the <code>&lt;div class=\"pt-2 pb-3 space-y-1\"&gt;</code> you will see a Dashboard <code>&lt;x-responsive-nav-link&gt;</code>. <strong>Directly after that Dashboard link</strong>, paste the following. The mobile component has a different name, so use this version rather than copying the desktop code.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/layouts/navigation.blade.php · add after mobile Dashboard link",
        "text": "<x-responsive-nav-link :href=\"route('books.index')\" :active=\"request()->routeIs('books.*')\">\n    {{ __('Books') }}\n</x-responsive-nav-link>\n<x-responsive-nav-link :href=\"route('authors.index')\" :active=\"request()->routeIs('authors.*')\">\n    {{ __('Authors') }}\n</x-responsive-nav-link>"
      },
      {
        "type": "text",
        "title": "Check the menu in your browser",
        "text": "<p>Save <code>navigation.blade.php</code> and reload <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books</a> while signed in. On a wide browser window, <strong>Dashboard, Books and Authors</strong> should appear in the top menu. Click Authors, then Books. The correct page should open each time, and its menu link should appear selected.</p><p>Next, narrow the browser window until the navigation switches to a menu button (or use your browser’s mobile-device view). Open the menu and check that <strong>Books</strong> and <strong>Authors</strong> appear there too. If the links are visible in only one layout, check that you updated both sections of the file.</p><p>In Module 06, you will return to this same file to add <strong>My Reviews</strong> alongside these links.</p>"
      },
      {
        "type": "check",
        "text": "You have seven view files: books/index.blade.php, books/show.blade.php, books/partials/card.blade.php, reviews/partials/review.blade.php, authors/index.blade.php, authors/show.blade.php and authors/partials/card.blade.php. Signed-in users can follow links between books and authors without missing-view or missing-route errors. The top navigation also has working Books and Authors links on both desktop and mobile layouts."
      },
      {
        "type": "help",
        "text": "If a page fails, note its URL and the exact error. Check the filename and folder under resources/views, the Blade @include name and the route name. Use php artisan route:list to check routes and php artisan view:clear after correcting a view. If you are sent to /login, sign in before repeating the check. If Books or Authors is missing from the top navigation, check both the <x-nav-link> and <x-responsive-nav-link> groups in layouts/navigation.blade.php."
      }
    ],
    "q": "Why is Book::with(\"authors\") correct here?",
    "options": [
      "There is only one author_id column on books.",
      "It reads from the users table.",
      "Book has a plural belongsToMany authors relationship, not a singular author relationship."
    ],
    "answer": 2,
    "feedback": "Book has a plural belongsToMany authors relationship, not a singular author relationship."
  },
  {
    "id": "m04-s04",
    "module": 4,
    "title": "Test the browsing experience",
    "time": "30–45 min",
    "intro": "Write tests that check whether your book and author pages work as expected.",
    "parts": [
      {
        "type": "text",
        "title": "What you will test",
        "text": "<p>You've already checked the book and author pages in the browser. Now you'll save some of those checks as automated tests, so Laravel can repeat them after future changes. You will create <code>tests/Feature/BookTest.php</code>, <code>tests/Feature/AuthorTest.php</code> and <code>tests/Unit/DatabaseSeederTest.php</code>.</p><p><strong>Before running database tests:</strong> use a separately configured test database or a disposable development database. <code>RefreshDatabase</code> may run migrations against the database configured for tests; do not run this against data you need to keep. Review the testing setup from 02-04.</p>"
      },
      {
        "type": "text",
        "title": "1. Repeat the browser checks",
        "text": "<p>First make sure the browser milestones work. Sign in and check <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">/books</a>, a book detail page, <a href=\"http://localhost:8080/authors\" target=\"_blank\" rel=\"noopener\">/authors</a>, and an author detail page. Then sign out and revisit <code>/books</code>: you should be redirected to the login page because these routes use the <code>auth</code> middleware.</p>"
      },
      {
        "type": "check",
        "text": "Signed-in visitors can browse /books and /authors and follow detail links. Signed-out visitors are redirected to /login."
      },
      {
        "type": "text",
        "title": "2. Generate the feature test files",
        "text": "<p>In the Laravel workspace terminal, generate two <strong>feature</strong> test files. Do not add <code>--unit</code> here: these tests will make HTTP requests. Laravel creates them inside <code>tests/Feature/</code>.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan make:test BookTest\nphp artisan make:test AuthorTest"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>Note that <code>tests/Unit/BookTest.php</code> and <code>tests/Unit/AuthorTest.php</code> already exist from Module 02. These are <em>different</em> files in <code>tests/Feature/</code>. Open the two new files and replace the generated contents with the complete versions below.</p>"
      },
      {
        "type": "code",
        "file": "src/tests/Feature/BookTest.php",
        "text": "<?php\n\nnamespace Tests\\Feature;\n\nuse App\\Models\\Author;\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse App\\Models\\User;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass BookTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_guests_are_redirected_to_login(): void\n    {\n        $response = $this->get(route('books.index'));\n        $response->assertRedirect(route('login', absolute: false));\n    }\n\n    public function test_the_index_page_lists_books(): void\n    {\n        $user = User::factory()->create();\n        Book::factory()->create(['title' => 'Dune']);\n\n        $response = $this->actingAs($user)->get(route('books.index'));\n        $response->assertOk();\n        $response->assertSee('Dune');\n    }\n\n    public function test_the_show_page_displays_a_books_authors_and_reviews(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create(['title' => 'Dune']);\n        $book->authors()->attach(Author::factory()->create(['name' => 'Frank Herbert']));\n        Review::factory()->create([\n            'book_id' => $book->id,\n            'user_id' => $user->id,\n            'comment' => 'A genuine classic.',\n        ]);\n\n        $response = $this->actingAs($user)->get(route('books.show', $book));\n        $response->assertOk();\n        $response->assertSee('Frank Herbert');\n        $response->assertSee('A genuine classic.');\n    }\n\n    public function test_a_nonexistent_book_returns_a_404(): void\n    {\n        $user = User::factory()->create();\n        $response = $this->actingAs($user)->get('/books/999');\n        $response->assertNotFound();\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>$this->get()</code> sends a test HTTP request. <code>actingAs($user)</code> makes that request as a signed-in user. <code>assertSee()</code> checks what the Blade template actually rendered, rather than only testing the database.</p>"
      },
      {
        "type": "code",
        "file": "src/tests/Feature/AuthorTest.php",
        "text": "<?php\n\nnamespace Tests\\Feature;\n\nuse App\\Models\\Author;\nuse App\\Models\\Book;\nuse App\\Models\\User;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass AuthorTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_guests_are_redirected_to_login(): void\n    {\n        $response = $this->get(route('authors.index'));\n        $response->assertRedirect(route('login', absolute: false));\n    }\n\n    public function test_the_index_page_lists_authors(): void\n    {\n        $user = User::factory()->create();\n        Author::factory()->create(['name' => 'Frank Herbert']);\n\n        $response = $this->actingAs($user)->get(route('authors.index'));\n        $response->assertOk();\n        $response->assertSee('Frank Herbert');\n    }\n\n    public function test_the_show_page_displays_an_authors_books(): void\n    {\n        $user = User::factory()->create();\n        $author = Author::factory()->create(['name' => 'Frank Herbert']);\n        $author->books()->attach(Book::factory()->create(['title' => 'Dune']));\n\n        $response = $this->actingAs($user)->get(route('authors.show', $author));\n        $response->assertOk();\n        $response->assertSee('Dune');\n    }\n\n    public function test_a_nonexistent_author_returns_a_404(): void\n    {\n        $user = User::factory()->create();\n        $response = $this->actingAs($user)->get('/authors/999');\n        $response->assertNotFound();\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p>These tests check that guests are redirected, that listing and detail pages display real data, and that a nonexistent book or author returns a 404. They do not depend on the seeded catalogue in your browser; the factories create temporary test records instead.</p>"
      },
      {
        "type": "text",
        "title": "3. Test the sample data seeder",
        "text": "<p>Now generate one <strong>unit</strong> test for the seeder. The <code>--unit</code> flag selects the <code>tests/Unit/</code> folder. Replace the generated PHP file with the complete class below.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan make:test DatabaseSeederTest --unit"
      },
      {
        "type": "code",
        "file": "src/tests/Unit/DatabaseSeederTest.php",
        "text": "<?php\n\nnamespace Tests\\Unit;\n\nuse App\\Models\\Author;\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse App\\Models\\User;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass DatabaseSeederTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_seeding_produces_the_expected_catalogue_shape(): void\n    {\n        $this->seed();\n\n        $this->assertSame(5, User::count());\n        $this->assertSame(5, Author::count());\n        $this->assertSame(20, Book::count());\n        $this->assertSame(60, Review::count());\n    }\n\n    public function test_seeding_produces_two_co_written_books(): void\n    {\n        $this->seed();\n\n        $this->assertSame(2, Book::has('authors', '>=', 2)->count());\n    }\n\n    public function test_seeding_leaves_two_books_without_reviews(): void\n    {\n        $this->seed();\n\n        $this->assertSame(2, Book::doesntHave('reviews')->count());\n    }\n}"
      },
      {
        "type": "text",
        "title": "",
        "text": "<p><code>$this->seed()</code> runs your seeder inside the test. The assertions verify the sample catalogue's size and a couple of its intended relationships. They are based on the seeded data built in Module 03; if you intentionally changed those counts, adjust the test to reflect your own agreed data.</p>"
      },
      {
        "type": "text",
        "title": "4. Run the tests",
        "text": "<p>Run each new file individually so failures are easier to locate. Then run the full suite. From the workspace container, where <code>artisan</code> is located:</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan test tests/Feature/BookTest.php\nphp artisan test tests/Feature/AuthorTest.php\nphp artisan test tests/Unit/DatabaseSeederTest.php\nphp artisan test"
      },
      {
        "type": "text",
        "title": "What passing tests mean",
        "text": "<p>If a test reports <code>View [books.partials.card] not found</code>, return to 04-02 and check that exact file. If a test reports <code>Route [authors.show] not defined</code>, check 04-01. If the tests pass but the actual browser doesn't, verify Docker is running, the same project's <code>src/</code> is being served and you are signed in.</p><p><strong>What you have completed:</strong> students can view books and authors, and you have feature tests covering both listing and detail routes. Creating/editing books and reviews are still future activities.</p>"
      },
      {
        "type": "check",
        "text": "The BookTest and AuthorTest feature files run successfully, and you can still open /books, /books/{id}, /authors and /authors/{id} in the browser. The DatabaseSeederTest confirms the expected sample-data structure."
      },
      {
        "type": "help",
        "text": "If a page fails, note its URL and the exact error. Check the filename and folder under resources/views, the Blade @include name and the route name. Use php artisan route:list to check routes and php artisan view:clear after correcting a view. If you are sent to /login, sign in before repeating the check."
      }
    ],
    "q": "Why do feature tests use get() and assertStatus()?",
    "options": [
      "They test the Docker image size.",
      "They exercise the HTTP response generated by the whole route-to-view path.",
      "They only test the database schema."
    ],
    "answer": 1,
    "feedback": "They exercise the HTTP response generated by the whole route-to-view path."
  },
  {
    "id": "m05-s01",
    "module": 5,
    "title": "Add your first book through a form",
    "time": "35–50 min",
    "intro": "Create an Add Book page, connect it to the database and check that the new book appears in the catalogue.",
    "parts": [
      {
        "type": "text",
        "title": "Before you begin",
        "text": "<p>You should have finished Module 04: <code>/books</code> displays the catalogue, clicking a book opens its detail page, and you can log in with your test account. Keep your Docker containers running.</p><p><strong>Work in your Laravel project, not the learning-site files.</strong> All file paths below start from your project folder on your computer (<code>src/…</code>). Run Artisan commands in the workspace terminal, as before.</p>"
      },
      {
        "type": "text",
        "title": "1. Add two routes to your existing list",
        "text": "<p>Open <code>src/routes/web.php</code>. Inside the existing <code>Route::middleware('auth')-&gt;group(...)</code>, find the <strong>books</strong> <code>Route::resource</code> line you created in 04-01. <strong>Replace that one line</strong> with the version below. Keep the author routes and everything else in the file.</p><p><code>create</code> gives you a new form page at <code>GET /books/create</code>; <code>store</code> handles the form when it is submitted to <code>POST /books</code>.</p>"
      },
      {
        "type": "code",
        "file": "src/routes/web.php · replace the existing books resource line",
        "text": "Route::resource('books', BookController::class)->only(['index', 'show', 'create', 'store']);"
      },
      {
        "type": "text",
        "title": "Check the new routes",
        "text": "<p>Run this in the Laravel workspace terminal. Look for the route names <code>books.create</code> and <code>books.store</code>, as well as the existing <code>books.index</code> and <code>books.show</code>.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan route:list --path=books"
      },
      {
        "type": "text",
        "title": "2. Add the create and store actions",
        "text": "<p>Open <code>src/app/Http/Controllers/BookController.php</code> and <strong>replace its contents</strong> with the complete class below. Your existing <code>index()</code> and <code>show()</code> methods are retained; two new methods are added.</p><p><code>create()</code> shows the form. <code>store()</code> checks the title and year, saves a new <code>Book</code> and redirects to that book’s detail page. We will expand the form and validation in 05-02.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Http/Controllers/BookController.php · complete file",
        "text": "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Book;\nuse Illuminate\\Http\\Request;\n\nclass BookController extends Controller\n{\n    public function index()\n    {\n        $books = Book::with('authors')\n            ->withCount('reviews')\n            ->withAvg('reviews', 'rating')\n            ->orderBy('title')\n            ->paginate(12);\n\n        return view('books.index', compact('books'));\n    }\n\n    public function show(Book $book)\n    {\n        $book->load(['authors', 'reviews.user']);\n\n        return view('books.show', compact('book'));\n    }\n    public function create()\n    {\n        return view('books.create');\n    }\n\n    public function store(Request $request)\n    {\n        $validated = $request->validate([\n            'title' => 'required|string|max:255',\n            'year' => 'required|integer|digits:4',\n        ]);\n\n        $book = Book::create($validated);\n\n        return redirect()->route('books.show', $book);\n    }\n}",
        "highlightLines": [
          6,
          27,
          28,
          29,
          30,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43
        ]
      },
      {
        "type": "text",
        "title": "3. Create the Blade template for the form",
        "text": "<p>In your editor, create <code>src/resources/views/books/create.blade.php</code>. The <code>books</code> folder already exists from Module 04. Copy in the <strong>complete file</strong> below.</p><p>This first version has only two fields, title and year. <code>@csrf</code> is required for the form’s POST request; Breeze’s <code>x-input-…</code> components provide the same styling as its login and registration pages.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/create.blade.php · new file",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">Add a Book</h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-2xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white shadow-sm rounded-lg p-6\">\n                <form method=\"POST\" action=\"{{ route('books.store') }}\" class=\"space-y-6\">\n                    @csrf\n\n                    <div>\n                        <x-input-label for=\"title\" value=\"Title\" />\n                        <x-text-input id=\"title\" name=\"title\" type=\"text\"\n                                      class=\"mt-1 block w-full\" required autofocus />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"year\" value=\"Year\" />\n                        <x-text-input id=\"year\" name=\"year\" type=\"number\"\n                                      class=\"mt-1 block w-full\" required />\n                    </div>\n\n                    <x-primary-button>Add Book</x-primary-button>\n                </form>\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "4. Add an Add Book link to the catalogue",
        "text": "<p>Open <code>src/resources/views/books/index.blade.php</code>, which you made in 04-02. <strong>Replace its contents</strong> with the updated file below. The book grid is the same; only the heading gains an <strong>Add Book</strong> link.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/index.blade.php · complete updated file",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <div class=\"flex items-center justify-between\">\n            <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n                {{ __('Books') }}\n            </h2>\n            <a href=\"{{ route('books.create') }}\"\n               class=\"inline-flex items-center px-4 py-2 bg-gray-800 rounded-md text-xs font-semibold uppercase text-white hover:bg-gray-700\">\n                {{ __('Add Book') }}\n            </a>\n        </div>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-7xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\">\n                @forelse ($books as $book)\n                    @include('books.partials.card', ['book' => $book])\n                @empty\n                    <p class=\"text-gray-600 col-span-full\">No books in the catalogue yet.</p>\n                @endforelse\n            </div>\n\n            <div class=\"mt-6\">\n                {{ $books->links() }}\n            </div>\n        </div>\n    </div>\n</x-app-layout>",
        "highlightLines": [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11
        ]
      },
      {
        "type": "text",
        "title": "5. Check the form in your browser",
        "text": "<p>Make sure you are signed in. Go to <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books</a> and click <strong>Add Book</strong>, or go directly to <a href=\"http://localhost:8080/books/create\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books/create</a>.</p><ol><li>You should see a page headed <strong>Add a Book</strong>, with Title, Year and Add Book.</li><li>Enter <strong>AAA Practice Book</strong> for the title and <strong>2024</strong> for the year; submit.</li><li>You should be taken to the new book’s detail page. Return to <code>/books</code> and find <strong>AAA Practice Book</strong>.</li><li>Optional database check: in phpMyAdmin, open the <code>books</code> table and find the new record.</li></ol><p>The book will have no linked author yet because this form doesn’t assign authors. That is expected.</p>"
      },
      {
        "type": "check",
        "text": "The Add Book link opens <code>/books/create</code>. Submitting a title and year creates a record and redirects to the new book’s detail page."
      },
      {
        "type": "help",
        "text": "Getting a 404? Check <code>php artisan route:list --path=books</code>. Getting “View [books.create] not found”? Check the exact filename <code>src/resources/views/books/create.blade.php</code>. Getting “Class … Request not found”? Check the <code>use Illuminate\\Http\\Request;</code> import at the top of the controller. If redirected to login, sign in with the account created in Module 03."
      }
    ],
    "q": "Why must a POST form contain @csrf?",
    "options": [
      "Laravel validates the CSRF token to protect state-changing browser requests.",
      "It uploads files to storage automatically.",
      "It changes POST into GET."
    ],
    "answer": 0,
    "feedback": "Laravel validates the CSRF token to protect state-changing browser requests."
  },
  {
    "id": "m05-s02",
    "module": 5,
    "title": "Check form entries and show useful errors",
    "time": "35–50 min",
    "intro": "Add the remaining book fields and show helpful messages without clearing what the user has typed.",
    "parts": [
      {
        "type": "text",
        "title": "Start with the working form from 05-01",
        "text": "<p>At the end of the previous activity, you could add a book using its title and year. We will now add the optional details (description, ISBN, publisher, edition and price) and improve what happens when a value is invalid.</p><p>In this activity you change <strong>two existing files</strong>. There are no new routes, controllers or Blade files.</p>"
      },
      {
        "type": "text",
        "title": "1. Update the store() method",
        "text": "<p>Open <code>src/app/Http/Controllers/BookController.php</code> and find the <code>store(Request $request)</code> method from 05-01. <strong>Replace only that method</strong> with the code below. Leave <code>index()</code>, <code>show()</code> and <code>create()</code> as they are.</p><p>The new rules allow optional details to be blank (<code>nullable</code>), require a four-digit year and reject a negative price. <code>$validated</code> contains only fields that pass these rules; it is then used to create the book.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Http/Controllers/BookController.php · replace store() method",
        "text": "public function store(Request $request)\n{\n    $validated = $request->validate([\n        'title' => 'required|string|max:255',\n        'description' => 'nullable|string',\n        'year' => 'required|integer|digits:4',\n        'isbn' => 'nullable|string|max:255',\n        'publisher' => 'nullable|string|max:255',\n        'edition_number' => 'nullable|string|max:255',\n        'price' => 'nullable|numeric|min:0',\n    ]);\n\n    $book = Book::create($validated);\n\n    return redirect()->route('books.show', $book);\n}",
        "highlightLines": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16
        ]
      },
      {
        "type": "text",
        "title": "What happens when validation fails?",
        "text": "<p>Laravel automatically sends the browser back to the form with an error message and the values already entered. You do not need to write a separate redirect. The next step displays these messages and values on the form.</p>"
      },
      {
        "type": "text",
        "title": "2. Replace the Add Book template",
        "text": "<p>Open <code>src/resources/views/books/create.blade.php</code> and <strong>replace the entire file</strong> with this version. It adds the remaining fields and, below each field, an <code>x-input-error</code> component. It also uses <code>old('field')</code> so previously submitted values remain in the form when validation fails.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/create.blade.php · complete updated file",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">Add a Book</h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-2xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white shadow-sm rounded-lg p-6\">\n                <form method=\"POST\" action=\"{{ route('books.store') }}\" class=\"space-y-6\">\n                    @csrf\n\n                    <div>\n                        <x-input-label for=\"title\" value=\"Title\" />\n                        <x-text-input id=\"title\" name=\"title\" type=\"text\" class=\"mt-1 block w-full\"\n                                      value=\"{{ old('title') }}\" required autofocus />\n                        <x-input-error :messages=\"$errors->get('title')\" class=\"mt-2\" />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"description\" value=\"Description\" />\n                        <textarea id=\"description\" name=\"description\" rows=\"4\"\n                                  class=\"mt-1 block w-full border-gray-300 rounded-md shadow-sm\">{{ old('description') }}</textarea>\n                        <x-input-error :messages=\"$errors->get('description')\" class=\"mt-2\" />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"year\" value=\"Year\" />\n                        <x-text-input id=\"year\" name=\"year\" type=\"number\" class=\"mt-1 block w-full\"\n                                      value=\"{{ old('year') }}\" required />\n                        <x-input-error :messages=\"$errors->get('year')\" class=\"mt-2\" />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"isbn\" value=\"ISBN\" />\n                        <x-text-input id=\"isbn\" name=\"isbn\" type=\"text\" class=\"mt-1 block w-full\"\n                                      value=\"{{ old('isbn') }}\" />\n                        <x-input-error :messages=\"$errors->get('isbn')\" class=\"mt-2\" />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"publisher\" value=\"Publisher\" />\n                        <x-text-input id=\"publisher\" name=\"publisher\" type=\"text\" class=\"mt-1 block w-full\"\n                                      value=\"{{ old('publisher') }}\" />\n                        <x-input-error :messages=\"$errors->get('publisher')\" class=\"mt-2\" />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"edition_number\" value=\"Edition\" />\n                        <x-text-input id=\"edition_number\" name=\"edition_number\" type=\"text\" class=\"mt-1 block w-full\"\n                                      value=\"{{ old('edition_number') }}\" />\n                        <x-input-error :messages=\"$errors->get('edition_number')\" class=\"mt-2\" />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"price\" value=\"Price\" />\n                        <x-text-input id=\"price\" name=\"price\" type=\"number\" step=\"0.01\" class=\"mt-1 block w-full\"\n                                      value=\"{{ old('price') }}\" />\n                        <x-input-error :messages=\"$errors->get('price')\" class=\"mt-2\" />\n                    </div>\n\n                    <x-primary-button>Add Book</x-primary-button>\n                </form>\n            </div>\n        </div>\n    </div>\n</x-app-layout>",
        "highlightLines": [
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58
        ]
      },
      {
        "type": "text",
        "title": "3. Check invalid and valid submissions",
        "text": "<p>Open <a href=\"http://localhost:8080/books/create\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books/create</a> while signed in.</p><ol><li>Enter <strong>Another Practice Book</strong> as Title, <strong>123</strong> as Year and <strong>19.99</strong> as Price.</li><li>Submit. The four-digit-year rule should reject <code>123</code>. You should remain on the Add Book form, see an error beside Year, and still see the title and price you typed.</li><li>Change Year to <strong>2024</strong> and submit again. You should see the new book detail page, including any optional details you entered.</li></ol><p><strong>Why test the year rather than an empty title?</strong> The browser’s built-in <code>required</code> check may stop an empty title before Laravel receives the form. Entering a three-digit year lets you see Laravel’s own validation message.</p>"
      },
      {
        "type": "text",
        "title": "A quick note on the rules",
        "text": "<p><code>required</code> means a field cannot be empty. <code>nullable</code> means it may be left blank. <code>digits:4</code> requires exactly four digits, and <code>min:0</code> prevents a negative price. <code>old()</code> and <code>x-input-error</code> make errors easier to correct. We will reuse these rules when adding the Edit Book page.</p>"
      },
      {
        "type": "check",
        "text": "An invalid three-digit year produces a clear error and preserves the other form values. Correcting the year lets the book save."
      },
      {
        "type": "help",
        "text": "If the form submits but you see no validation message, verify that <code>store()</code> uses <code>$request-&gt;validate()</code> and that the Year field contains <code>&lt;x-input-error :messages=\"$errors-&gt;get('year')\" … /&gt;</code>. If an SQL error appears, check that you are using <code>$validated</code>, not <code>$request-&gt;all()</code>, in <code>Book::create()</code>."
      }
    ],
    "q": "What does old(\"title\") return?",
    "options": [
      "It comes from a compiled CSS file.",
      "It queries all database records.",
      "The previously submitted input flashed to the session after validation failure."
    ],
    "answer": 2,
    "feedback": "The previously submitted input flashed to the session after validation failure."
  },
  {
    "id": "m05-s03",
    "module": 5,
    "title": "Edit books and upload cover images",
    "time": "50–70 min",
    "intro": "Create an Edit Book page, reuse the form and let users upload a cover image.",
    "parts": [
      {
        "type": "text",
        "title": "What you will make",
        "text": "<p>You already have a working Add Book form. Now you will create the Edit Book page, use the <strong>same form fields</strong> for adding and editing, and allow cover image uploads. We will do this by creating <strong>two new Blade files</strong>, updating the existing Add Book page and BookController, then adding an Edit link to the book detail page.</p><p>Continue from your completed 05-02 work. The file paths below are in your Laravel project’s <code>src/</code> folder.</p>"
      },
      {
        "type": "text",
        "title": "1. Add the edit and update routes",
        "text": "<p>Open <code>src/routes/web.php</code>. Find the <strong>existing</strong> books <code>Route::resource</code> line and <strong>replace only that line</strong> with this one. Keep the surrounding <code>auth</code> group and the author routes.</p><p><code>GET /books/{book}/edit</code> will display the form. Submitting changes uses <code>PUT /books/{book}</code>.</p>"
      },
      {
        "type": "code",
        "file": "src/routes/web.php · replace books resource line",
        "text": "Route::resource('books', BookController::class)->only(['index', 'show', 'create', 'store', 'edit', 'update']);"
      },
      {
        "type": "text",
        "title": "2. Create a shared form partial",
        "text": "<p>In <code>src/resources/views/books/partials/</code> (the folder already contains <code>card.blade.php</code>), create <strong><code>form.blade.php</code></strong>. This is a reusable form body: both the Add Book and Edit Book pages will include it.</p><p>Copy the <strong>complete partial</strong> below. Its fields use <code>old('title', $book-&gt;title ?? '')</code>: on the Edit page that shows the existing book value, while on Add Book the field starts blank. Following a validation error, the value just typed takes priority.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/partials/form.blade.php · new file",
        "text": "{{-- Shared between create.blade.php and edit.blade.php. $book is only set\n     when editing - old('field', $book->field ?? '') falls back to the\n     book's current value there, or to an empty string on create, and to\n     whatever was just typed in on either page if validation just failed. --}}\n<div>\n    <x-input-label for=\"title\" :value=\"__('Title')\" />\n    <x-text-input id=\"title\" name=\"title\" type=\"text\" class=\"mt-1 block w-full\" value=\"{{ old('title', $book->title ?? '') }}\" required autofocus />\n    <x-input-error :messages=\"$errors->get('title')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"description\" :value=\"__('Description')\" />\n    <textarea id=\"description\" name=\"description\" rows=\"4\"\n              class=\"mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm\">{{ old('description', $book->description ?? '') }}</textarea>\n    <x-input-error :messages=\"$errors->get('description')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"year\" :value=\"__('Year')\" />\n    <x-text-input id=\"year\" name=\"year\" type=\"number\" class=\"mt-1 block w-full\" value=\"{{ old('year', $book->year ?? '') }}\" required />\n    <x-input-error :messages=\"$errors->get('year')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"isbn\" :value=\"__('ISBN')\" />\n    <x-text-input id=\"isbn\" name=\"isbn\" type=\"text\" class=\"mt-1 block w-full\" value=\"{{ old('isbn', $book->isbn ?? '') }}\" />\n    <x-input-error :messages=\"$errors->get('isbn')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"publisher\" :value=\"__('Publisher')\" />\n    <x-text-input id=\"publisher\" name=\"publisher\" type=\"text\" class=\"mt-1 block w-full\" value=\"{{ old('publisher', $book->publisher ?? '') }}\" />\n    <x-input-error :messages=\"$errors->get('publisher')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"edition_number\" :value=\"__('Edition')\" />\n    <x-text-input id=\"edition_number\" name=\"edition_number\" type=\"text\" class=\"mt-1 block w-full\" value=\"{{ old('edition_number', $book->edition_number ?? '') }}\" />\n    <x-input-error :messages=\"$errors->get('edition_number')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"price\" :value=\"__('Price')\" />\n    <x-text-input id=\"price\" name=\"price\" type=\"number\" step=\"0.01\" class=\"mt-1 block w-full\" value=\"{{ old('price', $book->price ?? '') }}\" />\n    <x-input-error :messages=\"$errors->get('price')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"image\" :value=\"__('Cover image')\" />\n\n    @isset($book)\n        @if ($book->image)\n            <img src=\"{{ Storage::url($book->image) }}\" alt=\"Current cover of {{ $book->title }}\" class=\"mt-2 h-32 object-contain\">\n        @endif\n    @endisset\n\n    <input id=\"image\" name=\"image\" type=\"file\" accept=\"image/*\" class=\"mt-1 block w-full text-sm text-gray-700\">\n    <x-input-error :messages=\"$errors->get('image')\" class=\"mt-2\" />\n</div>\n\n<div class=\"flex items-center gap-4\">\n    <x-primary-button>{{ isset($book) ? __('Save Changes') : __('Add Book') }}</x-primary-button>\n</div>"
      },
      {
        "type": "text",
        "title": "3. Update the existing Add Book page",
        "text": "<p>Open <code>src/resources/views/books/create.blade.php</code> and <strong>replace the whole file</strong> with the code below. The fields you wrote in 05-02 now live in <code>books.partials.form</code>, so the page itself is much shorter.</p><p><code>enctype=\"multipart/form-data\"</code> is essential when a form includes a file upload.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/create.blade.php · complete updated file",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ __('Add a Book') }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-2xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                <form method=\"POST\" action=\"{{ route('books.store') }}\" enctype=\"multipart/form-data\" class=\"space-y-6\">\n                    @csrf\n\n                    @include('books.partials.form')\n                </form>\n            </div>\n        </div>\n    </div>\n</x-app-layout>",
        "highlightLines": [
          3,
          4,
          5,
          10,
          11,
          14
        ]
      },
      {
        "type": "text",
        "title": "4. Create the Edit Book page",
        "text": "<p>In the same <code>books</code> folder, create <strong><code>src/resources/views/books/edit.blade.php</code></strong>. Copy the file below. It uses the same form partial but sends its data to <code>books.update</code> and includes <code>@method('PUT')</code> so Laravel knows the action is an update rather than a new record.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/edit.blade.php · new file",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ __('Edit') }} {{ $book->title }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-2xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                <form method=\"POST\" action=\"{{ route('books.update', $book) }}\" enctype=\"multipart/form-data\" class=\"space-y-6\">\n                    @csrf\n                    @method('PUT')\n\n                    @include('books.partials.form', ['book' => $book])\n                </form>\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "5. Update BookController",
        "text": "<p>Open <code>src/app/Http/Controllers/BookController.php</code> and <strong>replace the entire file</strong> with this version. The <code>index()</code> and <code>show()</code> methods from Module 04 are still here. The controller now includes <code>edit()</code>, <code>update()</code>, image upload handling in <code>store()</code> and <code>update()</code>, and one <code>validationRules()</code> method shared by both actions.</p><p>The two new imports are <code>Illuminate\\Http\\Request</code> and <code>Illuminate\\Support\\Facades\\Storage</code>. Each upload is placed in the <code>books/</code> folder on Laravel’s <code>public</code> disk, and only its saved path goes into the <code>books.image</code> database column.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Http/Controllers/BookController.php · complete updated file",
        "text": "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Book;\nuse Illuminate\\Http\\Request;\nuse Illuminate\\Support\\Facades\\Storage;\n\nclass BookController extends Controller\n{\n    public function index()\n    {\n        $books = Book::with('authors')\n            ->withCount('reviews')\n            ->withAvg('reviews', 'rating')\n            ->orderBy('title')\n            ->paginate(12);\n\n        return view('books.index', compact('books'));\n    }\n\n    public function show(Book $book)\n    {\n        $book->load(['authors', 'reviews.user']);\n\n        return view('books.show', compact('book'));\n    }\n\n    public function create()\n    {\n        return view('books.create');\n    }\n\n    public function store(Request $request)\n    {\n        $validated = $request->validate($this->validationRules());\n\n        if ($request->hasFile('image')) {\n            $validated['image'] = Storage::disk('public')->putFile('books', $request->file('image'));\n        }\n\n        $book = Book::create($validated);\n\n        return redirect()->route('books.show', $book);\n    }\n\n    public function edit(Book $book)\n    {\n        return view('books.edit', compact('book'));\n    }\n\n    public function update(Request $request, Book $book)\n    {\n        $validated = $request->validate($this->validationRules());\n\n        if ($request->hasFile('image')) {\n            $validated['image'] = Storage::disk('public')->putFile('books', $request->file('image'));\n        }\n\n        $book->update($validated);\n\n        return redirect()->route('books.show', $book);\n    }\n\n    private function validationRules(): array\n    {\n        return [\n            'title' => 'required|string|max:255',\n            'description' => 'nullable|string',\n            'year' => 'required|integer|digits:4',\n            'isbn' => 'nullable|string|max:255',\n            'publisher' => 'nullable|string|max:255',\n            'edition_number' => 'nullable|string|max:255',\n            'price' => 'nullable|numeric|min:0',\n            'image' => 'nullable|image|max:2048',\n        ];\n    }\n}",
        "highlightLines": [
          7,
          28,
          36,
          37,
          38,
          39,
          40,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          64,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77
        ]
      },
      {
        "type": "text",
        "title": "6. Make uploaded covers accessible",
        "text": "<p>Run the following command in the <strong>workspace container</strong> (from the Laravel application directory). It creates the public storage link if it does not already exist. You only need to do this once for the project.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan storage:link"
      },
      {
        "type": "text",
        "title": "7. Add an Edit link to the book detail page",
        "text": "<p>Open <code>src/resources/views/books/show.blade.php</code> (created in 04-02). <strong>Replace its contents</strong> with the updated version below. It retains your existing authors, book details and reviews, but adds an Edit button beside the book title.</p><p>The cover already uses <code>Storage::url($book-&gt;image)</code> in Module 04, so it can now display real uploaded images as well as the placeholder.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/show.blade.php · complete updated file",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <div class=\"flex items-center justify-between gap-3\">\n            <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n                {{ $book->title }}\n            </h2>\n            <a href=\"{{ route('books.edit', $book) }}\"\n               class=\"inline-flex items-center px-4 py-2 bg-gray-800 rounded-md text-xs font-semibold uppercase text-white hover:bg-gray-700\">\n                Edit\n            </a>\n        </div>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6 flex flex-col sm:flex-row gap-6\">\n                <img src=\"{{ $book->image ? Storage::url($book->image) : asset('images/book-placeholder.png') }}\"\n                     alt=\"Cover of {{ $book->title }}\"\n                     class=\"w-full sm:w-48 h-48 object-contain rounded-md\">\n\n                <div class=\"flex-1\">\n                    <p class=\"text-gray-700\">\n                        {{ $book->authors->pluck('name')->join(', ') ?: 'Unknown author' }}\n                        &middot; {{ $book->year }}\n                    </p>\n\n                    @if ($book->description)\n                        <p class=\"text-gray-800 mt-4\">{{ $book->description }}</p>\n                    @endif\n\n                    <dl class=\"grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 mt-4\">\n                        @if ($book->isbn)\n                            <dt class=\"font-medium\">ISBN</dt>\n                            <dd>{{ $book->isbn }}</dd>\n                        @endif\n                        @if ($book->publisher)\n                            <dt class=\"font-medium\">Publisher</dt>\n                            <dd>{{ $book->publisher }}</dd>\n                        @endif\n                        @if ($book->edition_number)\n                            <dt class=\"font-medium\">Edition</dt>\n                            <dd>{{ $book->edition_number }}</dd>\n                        @endif\n                        @if ($book->price)\n                            <dt class=\"font-medium\">Price</dt>\n                            <dd>&euro;{{ number_format($book->price, 2) }}</dd>\n                        @endif\n                    </dl>\n                </div>\n            </div>\n\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                <h3 class=\"font-semibold text-lg text-gray-900\">Reviews</h3>\n                <div class=\"mt-2\">\n                    @forelse ($book->reviews as $review)\n                        @include('reviews.partials.review', ['review' => $review])\n                    @empty\n                        <p class=\"text-gray-600\">No reviews yet.</p>\n                    @endforelse\n                </div>\n            </div>\n        </div>\n    </div>\n</x-app-layout>",
        "highlightLines": []
      },
      {
        "type": "text",
        "title": "8. Check the pages and upload in your browser",
        "text": "<p>Sign in and go to <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books</a>.</p><ol><li>Open an existing book, then select <strong>Edit</strong>. Its title, year and any other saved details should already be filled in.</li><li>Change its title or price and click <strong>Save Changes</strong>. You should return to the updated detail page.</li><li>Choose Edit again, select a small JPG or PNG (under 2 MB) as the cover image and save.</li><li>You should now see the uploaded cover on the detail page, and it should also appear when you return to the catalogue.</li><li>Open <a href=\"http://localhost:8080/books/create\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books/create</a>. Create a new book with a cover to confirm Add Book still works.</li></ol><p>You can also verify the saved image path in the <code>books.image</code> column in phpMyAdmin. It will look something like <code>books/…jpg</code>, not like a full URL.</p>"
      },
      {
        "type": "check",
        "text": "The Edit button opens <code>/books/{id}/edit</code> with the current details filled in. Saving updates the book and uploaded cover images display correctly."
      },
      {
        "type": "help",
        "text": "A “View [books.partials.form] not found” error means the shared file is missing or incorrectly named. A 404 on Edit usually means <code>books.edit</code> was not added to <code>routes/web.php</code>. If the cover uploads but displays as broken, run <code>php artisan storage:link</code>, confirm <code>enctype=\"multipart/form-data\"</code> is on the form and check the <code>books.image</code> value in phpMyAdmin."
      }
    ],
    "q": "Where should the uploaded image path be saved?",
    "options": [
      "Only in a browser cookie.",
      "In books.image, using the path returned by the public storage disk.",
      "In the filename of the PHP view."
    ],
    "answer": 1,
    "feedback": "In books.image, using the path returned by the public storage disk."
  },
  {
    "id": "m05-s04",
    "module": 5,
    "title": "Delete books and test your changes",
    "time": "45–65 min",
    "intro": "Add a Delete button, then test adding, editing and deleting books.",
    "parts": [
      {
        "type": "text",
        "title": "Your final catalogue change",
        "text": "<p>You can now add books, edit their details and upload covers. This activity adds a Delete button and checks the complete flow using both the browser and Laravel feature tests.</p><p><strong>Take care:</strong> deleting a book removes its database record. Use one of the practice books you created, not an important record.</p>"
      },
      {
        "type": "text",
        "title": "1. Register the delete route",
        "text": "<p>Open <code>src/routes/web.php</code>. Find the books resource line from 05-03 and <strong>replace it</strong> with the version below, which adds <code>destroy</code>. Leave all other routes unchanged.</p><p>Unlike opening or editing a book, deleting a book sends a <code>DELETE</code> request to <code>/books/{book}</code>.</p>"
      },
      {
        "type": "code",
        "file": "src/routes/web.php · replace books resource line",
        "text": "Route::resource('books', BookController::class)->only(['index', 'show', 'create', 'store', 'edit', 'update', 'destroy']);"
      },
      {
        "type": "text",
        "title": "2. Add deletion to BookController",
        "text": "<p>Open <code>src/app/Http/Controllers/BookController.php</code>. Find the private <code>validationRules()</code> method near the bottom. <strong>Insert this new public <code>destroy()</code> method immediately before <code>validationRules()</code></strong>. Do not remove or replace the other methods.</p><p>First it deletes the uploaded cover file, if there is one; then it deletes the database record. Finally it sends the user back to the book listing.</p>"
      },
      {
        "type": "code",
        "file": "src/app/Http/Controllers/BookController.php · insert method inside class",
        "text": "public function destroy(Book $book)\n{\n    if ($book->image) {\n        Storage::disk('public')->delete($book->image);\n    }\n\n    $book->delete();\n\n    return redirect()->route('books.index');\n}",
        "highlightLines": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ]
      },
      {
        "type": "text",
        "title": "3. Add a Delete button to the book page",
        "text": "<p>Open <code>src/resources/views/books/show.blade.php</code> and <strong>replace the entire file</strong> with the updated version below. The Delete button sits next to Edit.</p><p>The form uses <code>@csrf</code> for security and <code>@method('DELETE')</code> because ordinary HTML forms cannot send a DELETE method directly. The browser confirmation asks before the request is sent.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/books/show.blade.php · complete updated file",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <div class=\"flex items-center justify-between gap-3\">\n            <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n                {{ $book->title }}\n            </h2>\n            <div class=\"flex items-center gap-2\">\n                <a href=\"{{ route('books.edit', $book) }}\"\n                   class=\"inline-flex items-center px-4 py-2 bg-gray-800 rounded-md text-xs font-semibold uppercase text-white hover:bg-gray-700\">\n                    Edit\n                </a>\n                <form method=\"POST\" action=\"{{ route('books.destroy', $book) }}\"\n                      onsubmit=\"return confirm('Delete this book? This cannot be undone.');\">\n                    @csrf\n                    @method('DELETE')\n                    <x-danger-button>Delete</x-danger-button>\n                </form>\n            </div>\n        </div>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6 flex flex-col sm:flex-row gap-6\">\n                <img src=\"{{ $book->image ? Storage::url($book->image) : asset('images/book-placeholder.png') }}\"\n                     alt=\"Cover of {{ $book->title }}\"\n                     class=\"w-full sm:w-48 h-48 object-contain rounded-md\">\n\n                <div class=\"flex-1\">\n                    <p class=\"text-gray-700\">\n                        {{ $book->authors->pluck('name')->join(', ') ?: 'Unknown author' }}\n                        &middot; {{ $book->year }}\n                    </p>\n\n                    @if ($book->description)\n                        <p class=\"text-gray-800 mt-4\">{{ $book->description }}</p>\n                    @endif\n\n                    <dl class=\"grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600 mt-4\">\n                        @if ($book->isbn)\n                            <dt class=\"font-medium\">ISBN</dt>\n                            <dd>{{ $book->isbn }}</dd>\n                        @endif\n                        @if ($book->publisher)\n                            <dt class=\"font-medium\">Publisher</dt>\n                            <dd>{{ $book->publisher }}</dd>\n                        @endif\n                        @if ($book->edition_number)\n                            <dt class=\"font-medium\">Edition</dt>\n                            <dd>{{ $book->edition_number }}</dd>\n                        @endif\n                        @if ($book->price)\n                            <dt class=\"font-medium\">Price</dt>\n                            <dd>&euro;{{ number_format($book->price, 2) }}</dd>\n                        @endif\n                    </dl>\n                </div>\n            </div>\n\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                <h3 class=\"font-semibold text-lg text-gray-900\">Reviews</h3>\n                <div class=\"mt-2\">\n                    @forelse ($book->reviews as $review)\n                        @include('reviews.partials.review', ['review' => $review])\n                    @empty\n                        <p class=\"text-gray-600\">No reviews yet.</p>\n                    @endforelse\n                </div>\n            </div>\n        </div>\n    </div>\n</x-app-layout>",
        "highlightLines": [
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18
        ]
      },
      {
        "type": "text",
        "title": "4. Test deleting a practice book in your browser",
        "text": "<p>Sign in, visit <a href=\"http://localhost:8080/books\" target=\"_blank\" rel=\"noopener\">http://localhost:8080/books</a> and open a book you created for testing.</p><ol><li>Check that the detail page now displays both <strong>Edit</strong> and <strong>Delete</strong>.</li><li>Click Delete, then <strong>Cancel</strong> in the confirmation: the book should remain.</li><li>Click Delete again and <strong>confirm</strong>. You should return to the catalogue, and the book should no longer appear.</li><li>Optional: look in the <code>books</code> table in phpMyAdmin and confirm the record is gone.</li></ol>"
      },
      {
        "type": "text",
        "title": "5. Extend the feature tests you created in 04-04",
        "text": "<p>Open the <strong>existing</strong> <code>src/tests/Feature/BookTest.php</code>. Do <strong>not</strong> create another file and do <strong>not</strong> delete the read-only browsing tests you already wrote.</p><p>At the top of the file, alongside the other <code>use</code> statements, <strong>add these two imports</strong> if they are not already present. They let us make fake uploaded images without touching real files.</p>"
      },
      {
        "type": "code",
        "file": "src/tests/Feature/BookTest.php · add imports near top",
        "text": "use Illuminate\\Http\\UploadedFile;\nuse Illuminate\\Support\\Facades\\Storage;"
      },
      {
        "type": "text",
        "title": "6. Add the new test methods",
        "text": "<p>Still in <code>src/tests/Feature/BookTest.php</code>, scroll down to the <strong>last closing brace of the <code>BookTest</code> class</strong>. Paste the methods below <em>inside</em> the class, immediately before that final brace. Keep the existing test methods intact.</p><p>These tests check successful creation, invalid data, editing, deleting, deleting the stored cover and the full add–edit–delete journey. They also check that a successful create redirects to the new book’s page.</p>"
      },
      {
        "type": "code",
        "file": "src/tests/Feature/BookTest.php · insert before the class’s final }",
        "text": "    public function test_a_book_can_be_created(): void\n    {\n        Storage::fake('public');\n        $user = User::factory()->create();\n\n        $response = $this->actingAs($user)->post(route('books.store'), [\n            'title' => 'Project Hail Mary',\n            'year' => 2021,\n            'image' => UploadedFile::fake()->image('cover.jpg'),\n        ]);\n\n        $book = Book::firstWhere('title', 'Project Hail Mary');\n        $response->assertRedirect(route('books.show', $book));\n        $this->assertNotNull($book);\n        Storage::disk('public')->assertExists($book->image);\n    }\n\n    public function test_creating_a_book_without_a_title_fails_validation_and_repopulates_the_form(): void\n    {\n        $user = User::factory()->create();\n\n        $response = $this->actingAs($user)\n            ->from(route('books.create'))\n            ->post(route('books.store'), [\n                'title' => '',\n                'year' => 2021,\n            ]);\n\n        $response->assertRedirect(route('books.create'));\n        $response->assertSessionHasErrors('title');\n        $response->assertSessionHasInput('year', 2021);\n        $this->assertDatabaseMissing('books', ['year' => 2021]);\n    }\n\n    public function test_a_book_can_be_updated(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create(['title' => 'Old Title']);\n\n        $response = $this->actingAs($user)->put(route('books.update', $book), [\n            'title' => 'New Title',\n            'year' => $book->year,\n        ]);\n\n        $response->assertRedirect(route('books.show', $book));\n        $this->assertSame('New Title', $book->fresh()->title);\n    }\n\n    public function test_updating_a_book_without_a_title_fails_validation_and_leaves_it_unchanged(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create(['title' => 'Dune']);\n\n        $response = $this->actingAs($user)->put(route('books.update', $book), [\n            'title' => '',\n            'year' => $book->year,\n        ]);\n\n        $response->assertSessionHasErrors('title');\n        $this->assertSame('Dune', $book->fresh()->title);\n    }\n\n    public function test_a_book_can_be_deleted(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create();\n\n        $response = $this->actingAs($user)->delete(route('books.destroy', $book));\n\n        $response->assertRedirect(route('books.index'));\n        $this->assertModelMissing($book);\n    }\n\n    public function test_deleting_a_book_removes_its_cover_image_from_storage(): void\n    {\n        Storage::fake('public');\n        $user = User::factory()->create();\n        $path = UploadedFile::fake()->image('cover.jpg')->store('books', 'public');\n        $book = Book::factory()->create(['image' => $path]);\n\n        $this->actingAs($user)->delete(route('books.destroy', $book));\n\n        Storage::disk('public')->assertMissing($path);\n    }\n\n    public function test_the_full_create_edit_delete_flow(): void\n    {\n        $user = User::factory()->create();\n\n        $createResponse = $this->actingAs($user)->post(route('books.store'), [\n            'title' => 'The Fellowship of the Ring',\n            'year' => 1954,\n        ]);\n        $book = Book::firstWhere('title', 'The Fellowship of the Ring');\n        $createResponse->assertRedirect(route('books.show', $book));\n\n        $editResponse = $this->actingAs($user)->put(route('books.update', $book), [\n            'title' => 'The Fellowship of the Ring (Revised)',\n            'year' => 1954,\n        ]);\n        $editResponse->assertRedirect(route('books.show', $book));\n        $this->assertSame('The Fellowship of the Ring (Revised)', $book->fresh()->title);\n\n        $deleteResponse = $this->actingAs($user)->delete(route('books.destroy', $book));\n        $deleteResponse->assertRedirect(route('books.index'));\n        $this->assertModelMissing($book);\n    }"
      },
      {
        "type": "text",
        "title": "7. Run the tests",
        "text": "<p>From the Laravel workspace terminal, run the Book feature tests first. If they pass, run the full suite. The test code uses <code>RefreshDatabase</code>, so <strong>use your existing disposable testing database configuration</strong> from Module 04; do not point tests at a database containing work you need to keep.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · workspace container",
        "text": "php artisan test tests/Feature/BookTest.php\nphp artisan test"
      },
      {
        "type": "text",
        "title": "What you should see",
        "text": "<p>The tests should report <strong>PASS</strong> rather than a failed assertion. The exact number of passing tests depends on which earlier tests you completed. In the browser you should now be able to add a book, edit it (including a cover image), and delete it.</p><p>If a test fails, read the first error carefully: a missing route points to <code>web.php</code>; a missing view points to a Blade filename; an unknown <code>Storage</code> or <code>UploadedFile</code> class usually means an import is missing.</p>"
      },
      {
        "type": "check",
        "text": "You have added the delete route and button, deleted a practice book in the browser and run the Book feature tests successfully."
      },
      {
        "type": "help",
        "text": "If the Delete button is missing, verify the updated <code>show.blade.php</code>. If the route is missing, run <code>php artisan route:list --path=books</code> and look for <code>books.destroy</code>. If PHP reports “unexpected token public”, you may have inserted <code>destroy()</code> outside the controller class or inside another method. Review where you placed the code. If the tests fail with missing classes, check the imports at the top of <code>BookTest.php</code>."
      }
    ],
    "q": "Why delete an uploaded cover separately?",
    "options": [
      "Deleting the database row does not automatically remove the file from storage.",
      "The database stores all uploaded files.",
      "Files are removed by redirect()."
    ],
    "answer": 0,
    "feedback": "Deleting the database row does not automatically remove the file from storage."
  },
  {
    "id": "m06-s01",
    "module": 6,
    "title": "Write a review for a book",
    "time": "30 min",
    "intro": "Create a review form, save a rating and comment, and check the result on the book page.",
    "parts": [
      {
        "type": "text",
        "title": "Before you begin",
        "text": "<p>You already have books, accounts and seeded reviews. Now you will add a page where a signed-in user can write a real review. Complete each step in order.</p>"
      },
      {
        "type": "text",
        "title": "1. Generate the controller",
        "text": "<p>From your Laravel project folder, generate the controller. Do not create a model or migration here; the <code>Review</code> model and reviews table were created in Module 02.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Run in the Laravel container, from the src directory",
        "text": "php artisan make:controller ReviewController"
      },
      {
        "type": "text",
        "title": "2. Register the two review routes",
        "text": "<p>Open <code>routes/web.php</code>. At the top add the <code>ReviewController</code> import. Inside the existing <code>Route::middleware('auth')->group(...)</code>, add the nested resource route shown below. Keep your book, author and profile routes.</p>"
      },
      {
        "type": "code",
        "file": "routes/web.php · import",
        "label": "",
        "text": "use App\\Http\\Controllers\\ReviewController;"
      },
      {
        "type": "code",
        "file": "routes/web.php · inside the existing auth group",
        "label": "",
        "text": "Route::resource('books.reviews', ReviewController::class)->only(['create', 'store']);"
      },
      {
        "type": "text",
        "title": "Why the route is nested",
        "text": "<p>This creates GET <code>/books/{book}/reviews/create</code> and POST <code>/books/{book}/reviews</code>. The book ID in the URL tells Laravel which book is being reviewed.</p>"
      },
      {
        "type": "text",
        "title": "3. Add the controller methods",
        "text": "<p>Open <code>app/Http/Controllers/ReviewController.php</code> and <strong>replace the generated class with this complete version</strong>, including all imports. The controller validates the rating, refuses a second review by the same user for the same book, and gets the user ID from the login session.</p>"
      },
      {
        "type": "code",
        "file": "app/Http/Controllers/ReviewController.php",
        "label": "",
        "text": "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Book;\nuse Illuminate\\Http\\Request;\n\nclass ReviewController extends Controller\n{\n    public function create(Book $book)\n    {\n        return view('reviews.create', compact('book'));\n    }\n\n    public function store(Request $request, Book $book)\n    {\n        $validated = $request->validate([\n            'rating' => 'required|integer|between:1,5',\n            'comment' => 'nullable|string',\n        ]);\n\n        if ($book->reviews()->where('user_id', auth()->id())->exists()) {\n            return back()->withErrors([\n                'rating' => 'You have already reviewed this book.',\n            ])->withInput();\n        }\n\n        $validated['user_id'] = auth()->id();\n        $book->reviews()->create($validated);\n\n        return redirect()->route('books.show', $book);\n    }\n}",
        "highlightLines": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33
        ]
      },
      {
        "type": "text",
        "title": "4. Create the review form",
        "text": "<p>Create the folder <code>resources/views/reviews</code> if it does not exist, then create <code>create.blade.php</code> inside it. Paste the entire template. This is a temporary standalone form; in 06-02 you will move its fields into a reusable partial.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/create.blade.php",
        "label": "",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            Review: {{ $book->title }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-2xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white shadow-sm rounded-lg p-6\">\n                <form method=\"POST\" action=\"{{ route('books.reviews.store', $book) }}\" class=\"space-y-6\">\n                    @csrf\n                    <div>\n                        <x-input-label for=\"rating\" :value=\"__('Rating')\" />\n                        <select id=\"rating\" name=\"rating\" required class=\"mt-1 block w-full border-gray-300 rounded-md\">\n                            <option value=\"\">Select a rating</option>\n                            @for ($i = 1; $i <= 5; $i++)\n                                <option value=\"{{ $i }}\" @selected(old('rating') == $i)>{{ $i }} / 5</option>\n                            @endfor\n                        </select>\n                        <x-input-error :messages=\"$errors->get('rating')\" class=\"mt-2\" />\n                    </div>\n\n                    <div>\n                        <x-input-label for=\"comment\" :value=\"__('Comment (optional)')\" />\n                        <textarea id=\"comment\" name=\"comment\" rows=\"4\" class=\"mt-1 block w-full border-gray-300 rounded-md\">{{ old('comment') }}</textarea>\n                        <x-input-error :messages=\"$errors->get('comment')\" class=\"mt-2\" />\n                    </div>\n\n                    <x-primary-button>Submit Review</x-primary-button>\n                </form>\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "5. Add a link on each book page",
        "text": "<p>Open <code>resources/views/books/show.blade.php</code>. Find the section containing the <strong>Reviews</strong> heading. Add this link beside the heading, or just underneath it. Do not replace the rest of the book-detail page.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/books/show.blade.php · inside the Reviews section",
        "label": "",
        "text": "<a href=\"{{ route('books.reviews.create', $book) }}\" class=\"text-blue-600 hover:underline\">Write a Review</a>",
        "highlightLines": [
          1
        ]
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "6. Confirm the new GET and POST routes are registered",
        "text": "php artisan route:list --path=books"
      },
      {
        "type": "text",
        "title": "7. Check in your browser",
        "text": "<p>While signed in, open <code>http://localhost:8080/books</code>, select a book, and click <strong>Write a Review</strong>. Submit a rating and optional comment. You should return to the book page and see your review. Open the form again for the same book and try to submit another: you should get the message <em>You have already reviewed this book.</em> You can inspect the new row in phpMyAdmin’s <code>reviews</code> table too.</p>"
      },
      {
        "type": "check",
        "text": "A new review can be submitted and appears on its book page; a duplicate review for the same signed-in account is rejected with a form error."
      },
      {
        "type": "help",
        "text": "If Request or Book is reported as an unknown class, check the imports at the top of ReviewController.php. If the route is missing, verify it was added inside the auth group and run php artisan route:list --path=books. If a view is missing, check resources/views/reviews/create.blade.php."
      }
    ],
    "q": "Where does the review’s user_id come from?",
    "options": [
      "A hidden form field supplied by the browser.",
      "The signed-in session via auth()->id().",
      "The book title."
    ],
    "answer": 1,
    "feedback": "The controller uses the authenticated session rather than trusting a user_id in the submitted form."
  },
  {
    "id": "m06-s02",
    "module": 6,
    "title": "Edit and delete your own reviews",
    "time": "40 min",
    "intro": "Let users change their reviews, while preventing changes to reviews written by someone else.",
    "parts": [
      {
        "type": "text",
        "title": "What changes in this activity",
        "text": "<p>You can now write a review, but you cannot correct or delete it. You will add the edit and delete actions, and make sure that a different user cannot change somebody else’s review.</p>"
      },
      {
        "type": "text",
        "title": "1. Register routes for existing reviews",
        "text": "<p>Open <code>routes/web.php</code> and add the second resource route <strong>inside the existing auth group</strong>, after <code>books.reviews</code>. Keep the existing nested route from 06-01.</p>"
      },
      {
        "type": "code",
        "file": "routes/web.php · inside the auth group",
        "label": "",
        "text": "Route::resource('reviews', ReviewController::class)->only(['edit', 'update', 'destroy']);"
      },
      {
        "type": "text",
        "title": "Why there are two resource routes",
        "text": "<p>An existing review has its own ID, so its edit and delete URLs can be <code>/reviews/{review}/edit</code> and <code>/reviews/{review}</code>. The create and store routes remain nested under a book.</p>"
      },
      {
        "type": "text",
        "title": "2. Update the controller",
        "text": "<p>Open <code>ReviewController.php</code> and replace its contents with the class below. This keeps your 06-01 create/store logic and adds <code>edit()</code>, <code>update()</code> and <code>destroy()</code>. The <code>authorizeOwner()</code> method returns a 403 response when another user tries to change the review, even by typing the URL directly. It also reuses the same rating validation on create and update.</p>"
      },
      {
        "type": "code",
        "file": "app/Http/Controllers/ReviewController.php",
        "label": "",
        "text": "<?php\n\nnamespace App\\Http\\Controllers;\n\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse Illuminate\\Http\\Request;\n\nclass ReviewController extends Controller\n{\n    /**\n     * Show the form for leaving a review on the given book.\n     */\n    public function create(Book $book)\n    {\n        return view('reviews.create', compact('book'));\n    }\n\n    /**\n     * Store a newly created review for the given book.\n     */\n    public function store(Request $request, Book $book)\n    {\n        $validated = $request->validate($this->validationRules());\n\n        // The migration's unique index on [book_id, user_id] already stops\n        // a second row for this exact pair existing - this check exists so\n        // trying anyway gets the same friendly redirect-back-with-errors\n        // treatment as any other validation failure, rather than a raw\n        // \"Duplicate entry\" database exception reaching the browser.\n        if ($book->reviews()->where('user_id', auth()->id())->exists()) {\n            return back()->withErrors([\n                'rating' => 'You have already reviewed this book.',\n            ])->withInput();\n        }\n\n        $validated['user_id'] = auth()->id();\n        $book->reviews()->create($validated);\n\n        return redirect()->route('books.show', $book);\n    }\n\n    /**\n     * Show the form for editing the given review.\n     */\n    public function edit(Review $review)\n    {\n        $this->authorizeOwner($review);\n\n        return view('reviews.edit', compact('review'));\n    }\n\n    /**\n     * Update the given review.\n     */\n    public function update(Request $request, Review $review)\n    {\n        $this->authorizeOwner($review);\n\n        $review->update($request->validate($this->validationRules()));\n\n        return redirect()->route('books.show', $review->book);\n    }\n\n    /**\n     * Delete the given review.\n     */\n    public function destroy(Review $review)\n    {\n        $this->authorizeOwner($review);\n\n        // $review->book has to be read before delete() - afterwards the\n        // row (and the foreign key that made this relationship work) is\n        // gone, and there'd be nothing left to redirect back to.\n        $book = $review->book;\n        $review->delete();\n\n        return redirect()->route('books.show', $book);\n    }\n\n    /**\n     * Validation rules shared by store() and update() - a review still has\n     * to make sense the second time it's saved, not just the first.\n     */\n    private function validationRules(): array\n    {\n        return [\n            'rating' => 'required|integer|between:1,5',\n            'comment' => 'nullable|string',\n        ];\n    }\n\n    /**\n     * Guard edit/update/destroy against anyone but the review's own author.\n     * A stand-in for the Policy class Part 2 introduces - Laravel's actual\n     * mechanism for exactly this kind of check - kept this plain for now\n     * so that lesson isn't taught early by accident.\n     */\n    private function authorizeOwner(Review $review): void\n    {\n        if ($review->user_id !== auth()->id()) {\n            abort(403);\n        }\n    }\n}",
        "highlightLines": [
          6,
          11,
          12,
          13,
          19,
          20,
          21,
          24,
          26,
          27,
          28,
          29,
          30,
          42,
          43,
          44,
          45,
          46,
          47,
          48,
          49,
          50,
          51,
          52,
          53,
          54,
          55,
          56,
          57,
          58,
          59,
          60,
          61,
          62,
          63,
          64,
          65,
          66,
          67,
          68,
          69,
          70,
          71,
          72,
          73,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          82,
          83,
          84,
          85,
          86,
          87,
          88,
          89,
          90,
          91,
          92,
          93,
          94,
          95,
          96,
          97,
          98,
          99,
          100,
          101,
          102,
          103,
          104
        ]
      },
      {
        "type": "text",
        "title": "3. Make a shared review form",
        "text": "<p>Create the folder <code>resources/views/reviews/partials</code>. Create <code>form.blade.php</code> inside it with the following complete code. It handles both a blank create form and an edit form that starts with saved values.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/partials/form.blade.php",
        "label": "",
        "text": "{{-- Shared between create.blade.php and edit.blade.php. $review is only set\n     when editing - old('field', $review->field ?? '') falls back to the\n     review's current value there, or to an empty string on create, and to\n     whatever was just typed in on either page if validation just failed. --}}\n<div>\n    <x-input-label for=\"rating\" :value=\"__('Rating')\" />\n    <select id=\"rating\" name=\"rating\" class=\"mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm\" required>\n        <option value=\"\">{{ __('Select a rating') }}</option>\n        @for ($i = 1; $i <= 5; $i++)\n            <option value=\"{{ $i }}\" @selected(old('rating', $review->rating ?? '') == $i)>{{ $i }} / 5</option>\n        @endfor\n    </select>\n    <x-input-error :messages=\"$errors->get('rating')\" class=\"mt-2\" />\n</div>\n\n<div>\n    <x-input-label for=\"comment\" :value=\"__('Comment')\" />\n    <textarea id=\"comment\" name=\"comment\" rows=\"4\"\n              class=\"mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm\">{{ old('comment', $review->comment ?? '') }}</textarea>\n    <x-input-error :messages=\"$errors->get('comment')\" class=\"mt-2\" />\n</div>\n\n<div class=\"flex items-center gap-4\">\n    <x-primary-button>{{ isset($review) ? __('Save Changes') : __('Submit Review') }}</x-primary-button>\n</div>"
      },
      {
        "type": "text",
        "title": "4. Update the create page",
        "text": "<p>Replace the standalone <code>reviews/create.blade.php</code> from 06-01 with this shorter file. The form fields now come from the shared partial.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/create.blade.php",
        "label": "",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ __('Review') }}: {{ $book->title }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-2xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                <form method=\"POST\" action=\"{{ route('books.reviews.store', $book) }}\" class=\"space-y-6\">\n                    @csrf\n\n                    @include('reviews.partials.form')\n                </form>\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "5. Create the edit page",
        "text": "<p>Create a new file <code>resources/views/reviews/edit.blade.php</code> for the edit page. The <code>@method('PUT')</code> line tells Laravel that this form updates an existing record.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/edit.blade.php",
        "label": "",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ __('Edit Review') }}: {{ $review->book->title }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-2xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                <form method=\"POST\" action=\"{{ route('reviews.update', $review) }}\" class=\"space-y-6\">\n                    @csrf\n                    @method('PUT')\n\n                    @include('reviews.partials.form', ['review' => $review])\n                </form>\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "6. Show Edit and Delete beside your own reviews",
        "text": "<p>Finally, replace the existing <code>resources/views/reviews/partials/review.blade.php</code>, first created in Module 04, with this version. It shows Edit and Delete only alongside reviews belonging to the signed-in account. The controller is still responsible for enforcing ownership.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/partials/review.blade.php",
        "label": "",
        "text": "<div class=\"border-b border-gray-200 py-4 last:border-b-0\">\n    <div class=\"flex items-center justify-between\">\n        <span class=\"font-medium text-gray-900\">{{ $review->user->name }}</span>\n        <span class=\"text-sm text-gray-500\">{{ $review->rating }} / 5</span>\n    </div>\n\n    @if ($review->comment)\n        <p class=\"text-gray-700 mt-1\">{{ $review->comment }}</p>\n    @endif\n\n    <div class=\"flex items-center justify-between mt-1\">\n        <p class=\"text-xs text-gray-400\">{{ $review->created_at->format('d M Y') }}</p>\n\n        @if ($review->user_id === auth()->id())\n            <div class=\"flex items-center gap-3\">\n                <a href=\"{{ route('reviews.edit', $review) }}\" class=\"text-xs text-gray-500 hover:text-gray-800 hover:underline\">\n                    {{ __('Edit') }}\n                </a>\n\n                <form method=\"POST\" action=\"{{ route('reviews.destroy', $review) }}\"\n                      onsubmit=\"return confirm('Delete this review? This cannot be undone.');\">\n                    @csrf\n                    @method('DELETE')\n                    <button type=\"submit\" class=\"text-xs text-red-600 hover:text-red-800 hover:underline\">\n                        {{ __('Delete') }}\n                    </button>\n                </form>\n            </div>\n        @endif\n    </div>\n</div>",
        "highlightLines": []
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "7. Confirm the review edit, update and delete routes",
        "text": "php artisan route:list --path=reviews"
      },
      {
        "type": "text",
        "title": "8. Check in your browser",
        "text": "<p>Sign in as the test account you used in 06-01. Open that book, edit your rating, save, then delete the review. Check that its row is gone in the browser and in phpMyAdmin. For the ownership check, use a second registered account: you should not see Edit or Delete beside the first user’s review. If you type the first review’s actual edit URL while signed in as the second user, you should receive <strong>403 Forbidden</strong>.</p>"
      },
      {
        "type": "check",
        "text": "The owner can edit and delete a review. Other signed-in users do not see the controls and cannot use those routes directly."
      },
      {
        "type": "help",
        "text": "If a review form fails, check that both create.blade.php and edit.blade.php include reviews.partials.form and that the form file exists. If you see an unknown Review or Request class, compare all imports in the complete ReviewController code. If edit routes return 404, run route:list --path=reviews."
      }
    ],
    "q": "Why is hiding the Edit button not enough to protect a review?",
    "options": [
      "People can still request its URL directly.",
      "Hidden buttons always block access.",
      "Blade views automatically authorise every request."
    ],
    "answer": 0,
    "feedback": "The controller must check ownership because anyone can attempt the URL directly."
  },
  {
    "id": "m06-s03",
    "module": 6,
    "title": "Create a My Reviews page",
    "time": "30 min",
    "intro": "Add a page where each user can find and manage the reviews they have written.",
    "parts": [
      {
        "type": "text",
        "title": "The goal",
        "text": "<p>Your reviews currently appear under individual books. Next, add one page that lists only the reviews written by the logged-in user.</p>"
      },
      {
        "type": "text",
        "title": "1. Add the My Reviews route",
        "text": "<p>Inside the authentication group in <code>routes/web.php</code>, add the following GET route after the existing review routes. There is no <code>reviews.index</code> resource action here; this page is specifically called <code>reviews.mine</code>.</p>"
      },
      {
        "type": "code",
        "file": "routes/web.php · inside auth group",
        "label": "",
        "text": "Route::get('/my-reviews', [ReviewController::class, 'mine'])->name('reviews.mine');"
      },
      {
        "type": "text",
        "title": "2. Add the controller action",
        "text": "<p>Open <code>app/Http/Controllers/ReviewController.php</code> and add this method <strong>inside the existing ReviewController class</strong>, before its final closing brace. Do not remove the methods from 06-02. <code>auth()->user()->reviews()</code> filters by the current user, and <code>with('book')</code> loads book titles efficiently.</p>"
      },
      {
        "type": "code",
        "file": "app/Http/Controllers/ReviewController.php · method to add",
        "label": "",
        "text": "public function mine()\n{\n    $reviews = auth()->user()->reviews()\n        ->with('book')\n        ->latest()\n        ->paginate(12);\n\n    return view('reviews.mine', compact('reviews'));\n}"
      },
      {
        "type": "text",
        "title": "3. Create the row partial",
        "text": "<p>Create <code>resources/views/reviews/partials/mine-row.blade.php</code>. Each review row links back to its book and includes the existing edit/delete routes.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/partials/mine-row.blade.php",
        "label": "",
        "text": "<div class=\"border-b border-gray-200 py-4 last:border-b-0\">\n    <div class=\"flex items-center justify-between\">\n        <a href=\"{{ route('books.show', $review->book) }}\" class=\"font-medium text-gray-900 hover:underline\">\n            {{ $review->book->title }}\n        </a>\n        <span class=\"text-sm text-gray-500\">{{ $review->rating }} / 5</span>\n    </div>\n\n    @if ($review->comment)\n        <p class=\"text-gray-700 mt-1\">{{ $review->comment }}</p>\n    @endif\n\n    <div class=\"flex items-center justify-between mt-1\">\n        <p class=\"text-xs text-gray-400\">{{ $review->created_at->format('d M Y') }}</p>\n\n        <div class=\"flex items-center gap-3\">\n            <a href=\"{{ route('reviews.edit', $review) }}\" class=\"text-xs text-gray-500 hover:text-gray-800 hover:underline\">\n                {{ __('Edit') }}\n            </a>\n\n            <form method=\"POST\" action=\"{{ route('reviews.destroy', $review) }}\"\n                  onsubmit=\"return confirm('Delete this review? This cannot be undone.');\">\n                @csrf\n                @method('DELETE')\n                <button type=\"submit\" class=\"text-xs text-red-600 hover:text-red-800 hover:underline\">\n                    {{ __('Delete') }}\n                </button>\n            </form>\n        </div>\n    </div>\n</div>"
      },
      {
        "type": "text",
        "title": "4. Create the My Reviews page",
        "text": "<p>Create <code>resources/views/reviews/mine.blade.php</code>. It uses the row partial, shows an empty message when necessary, and adds pagination.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/mine.blade.php",
        "label": "",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n            {{ __('My Reviews') }}\n        </h2>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-4xl mx-auto sm:px-6 lg:px-8\">\n            <div class=\"bg-white overflow-hidden shadow-sm rounded-lg p-6\">\n                @forelse ($reviews as $review)\n                    @include('reviews.partials.mine-row', ['review' => $review])\n                @empty\n                    <p class=\"text-gray-600\">\n                        {{ __(\"You haven't reviewed any books yet.\") }}\n                        <a href=\"{{ route('books.index') }}\" class=\"text-gray-800 underline\">{{ __('Browse the catalogue') }}</a>\n                        {{ __('to find one.') }}\n                    </p>\n                @endforelse\n            </div>\n\n            <div class=\"mt-6\">\n                {{ $reviews->links() }}\n            </div>\n        </div>\n    </div>\n</x-app-layout>"
      },
      {
        "type": "text",
        "title": "5. Add the navigation links",
        "text": "<p>In <strong>04-03</strong>, you added Books and Authors links to both versions of the Breeze menu. Now open <code>src/resources/views/layouts/navigation.blade.php</code> again. Add the <strong>My Reviews</strong> link once immediately after Authors in the desktop navigation list, and once after Authors in the mobile list. Keep the existing Dashboard, Books and Authors links. Do not replace the navigation layout.</p>"
      },
      {
        "type": "code",
        "file": "src/resources/views/layouts/navigation.blade.php · desktop",
        "label": "",
        "text": "<x-nav-link :href=\"route('reviews.mine')\" :active=\"request()->routeIs('reviews.mine')\">\n    {{ __('My Reviews') }}\n</x-nav-link>"
      },
      {
        "type": "code",
        "file": "src/resources/views/layouts/navigation.blade.php · mobile",
        "label": "",
        "text": "<x-responsive-nav-link :href=\"route('reviews.mine')\" :active=\"request()->routeIs('reviews.mine')\">\n    {{ __('My Reviews') }}\n</x-responsive-nav-link>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "6. Verify the page route",
        "text": "php artisan route:list --path=my-reviews"
      },
      {
        "type": "text",
        "title": "6. Check in your browser",
        "text": "<p>While signed in, open <code>http://localhost:8080/my-reviews</code> or click My Reviews in the navigation. It should show just your reviews. Log in with a different test account: that account should see only its own reviews, or the empty-state message if it has none. Try Edit on a row and return to My Reviews afterwards.</p>"
      },
      {
        "type": "check",
        "text": "My Reviews opens from navigation, lists only the current user’s reviews, and shows a useful message when that user has none."
      },
      {
        "type": "help",
        "text": "If the page returns 404, inspect route:list --path=my-reviews. If it says method mine does not exist, make sure it is inside ReviewController, not after the closing brace. If the navigation breaks, check that you added a link rather than replacing a Breeze layout section."
      }
    ],
    "q": "Which query ensures My Reviews shows the signed-in user’s reviews only?",
    "options": [
      "Review::all()",
      "auth()->user()->reviews()",
      "Book::with(\"authors\")"
    ],
    "answer": 1,
    "feedback": "Starting from auth()->user()->reviews() restricts the results to that account."
  },
  {
    "id": "m06-s04",
    "module": 6,
    "title": "Test review creation and ownership",
    "time": "35 min",
    "intro": "Write feature tests that prove reviews work and that only their owners can change them.",
    "parts": [
      {
        "type": "text",
        "title": "What the tests will check",
        "text": "<p>You have tested reviews by hand. Now add automated checks for creating, editing and deleting, including attempts made by the wrong user. Tests must run against a <strong>disposable test database</strong>, not an important database you wish to keep.</p>"
      },
      {
        "type": "text",
        "title": "1. Create the feature test class",
        "text": "<p>From the Laravel <code>src</code> directory, generate the feature test file. This is different from the <code>tests/Unit/ReviewTest.php</code> you created earlier; both files can exist.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Run in the Laravel container, from the src directory",
        "text": "php artisan make:test ReviewTest"
      },
      {
        "type": "text",
        "title": "2. Add tests for the review actions",
        "text": "<p>Open <code>tests/Feature/ReviewTest.php</code> and <strong>replace its contents</strong> with the complete class below, including namespace, model imports, <code>RefreshDatabase</code> and all test methods.</p>"
      },
      {
        "type": "code",
        "file": "tests/Feature/ReviewTest.php",
        "label": "",
        "text": "<?php\n\nnamespace Tests\\Feature;\n\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse App\\Models\\User;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass ReviewTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_a_review_can_be_created(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create();\n\n        $response = $this->actingAs($user)->post(route('books.reviews.store', $book), [\n            'rating' => 4,\n            'comment' => 'Solid read.',\n        ]);\n\n        $review = Review::firstWhere(['book_id' => $book->id, 'user_id' => $user->id]);\n        $response->assertRedirect(route('books.show', $book));\n        $this->assertNotNull($review);\n        $this->assertSame(4, $review->rating);\n    }\n\n    public function test_creating_a_review_without_a_rating_fails_validation_and_repopulates_the_form(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create();\n\n        $response = $this->actingAs($user)\n            ->from(route('books.reviews.create', $book))\n            ->post(route('books.reviews.store', $book), [\n                'rating' => '',\n                'comment' => 'Should not save.',\n            ]);\n\n        $response->assertRedirect(route('books.reviews.create', $book));\n        $response->assertSessionHasErrors('rating');\n        $response->assertSessionHasInput('comment', 'Should not save.');\n        $this->assertDatabaseMissing('reviews', ['comment' => 'Should not save.']);\n    }\n\n    public function test_reviewing_the_same_book_twice_fails_with_a_friendly_error(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create();\n        Review::factory()->create(['book_id' => $book->id, 'user_id' => $user->id]);\n\n        $response = $this->actingAs($user)->post(route('books.reviews.store', $book), [\n            'rating' => 3,\n        ]);\n\n        $response->assertSessionHasErrors('rating');\n        $this->assertCount(1, $book->reviews()->where('user_id', $user->id)->get());\n    }\n\n    public function test_a_review_can_be_updated_by_its_owner(): void\n    {\n        $user = User::factory()->create();\n        $review = Review::factory()->create(['user_id' => $user->id, 'rating' => 2]);\n\n        $response = $this->actingAs($user)->put(route('reviews.update', $review), [\n            'rating' => 5,\n            'comment' => 'Changed my mind - loved it.',\n        ]);\n\n        $response->assertRedirect(route('books.show', $review->book));\n        $this->assertSame(5, $review->fresh()->rating);\n    }\n\n    public function test_a_review_can_be_deleted_by_its_owner(): void\n    {\n        $user = User::factory()->create();\n        $review = Review::factory()->create(['user_id' => $user->id]);\n        $book = $review->book;\n\n        $response = $this->actingAs($user)->delete(route('reviews.destroy', $review));\n\n        $response->assertRedirect(route('books.show', $book));\n        $this->assertModelMissing($review);\n    }\n\n    public function test_editing_someone_elses_review_is_forbidden(): void\n    {\n        $owner = User::factory()->create();\n        $review = Review::factory()->create(['user_id' => $owner->id]);\n        $someoneElse = User::factory()->create();\n\n        $response = $this->actingAs($someoneElse)->get(route('reviews.edit', $review));\n\n        $response->assertForbidden();\n    }\n\n    public function test_updating_someone_elses_review_is_forbidden(): void\n    {\n        $owner = User::factory()->create();\n        $review = Review::factory()->create(['user_id' => $owner->id, 'rating' => 3]);\n        $someoneElse = User::factory()->create();\n\n        $response = $this->actingAs($someoneElse)->put(route('reviews.update', $review), [\n            'rating' => 1,\n        ]);\n\n        $response->assertForbidden();\n        $this->assertSame(3, $review->fresh()->rating);\n    }\n\n    public function test_deleting_someone_elses_review_is_forbidden(): void\n    {\n        $owner = User::factory()->create();\n        $review = Review::factory()->create(['user_id' => $owner->id]);\n        $someoneElse = User::factory()->create();\n\n        $response = $this->actingAs($someoneElse)->delete(route('reviews.destroy', $review));\n\n        $response->assertForbidden();\n        $this->assertModelExists($review);\n    }\n\n    public function test_the_full_write_edit_delete_flow_as_the_reviews_own_author(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create();\n\n        $createResponse = $this->actingAs($user)->post(route('books.reviews.store', $book), [\n            'rating' => 3,\n            'comment' => 'Decent.',\n        ]);\n        $review = Review::firstWhere(['book_id' => $book->id, 'user_id' => $user->id]);\n        $createResponse->assertRedirect(route('books.show', $book));\n\n        $updateResponse = $this->actingAs($user)->put(route('reviews.update', $review), [\n            'rating' => 5,\n            'comment' => 'Actually, loved it on a re-read.',\n        ]);\n        $updateResponse->assertRedirect(route('books.show', $book));\n        $this->assertSame(5, $review->fresh()->rating);\n\n        $deleteResponse = $this->actingAs($user)->delete(route('reviews.destroy', $review));\n        $deleteResponse->assertRedirect(route('books.show', $book));\n        $this->assertModelMissing($review);\n    }\n}"
      },
      {
        "type": "text",
        "title": "How the ownership tests work",
        "text": "<p>In the tests, <code>actingAs($user)</code> signs in as a particular account. <code>assertForbidden()</code> confirms that a different user receives HTTP 403 when attempting an action they do not own. The tests check actual database changes, not just whether buttons appear in Blade.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "3. Run the new feature tests",
        "text": "php artisan test --filter=ReviewTest"
      },
      {
        "type": "text",
        "title": "4. Run the full suite",
        "text": "<p>You should see all the new review feature tests pass. If a test fails, read the named failure and compare the route, controller action and form data with that test. Then run the full suite below. Do not rely on a specific fixed total number of tests, as that depends on which earlier exercises you completed.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Run in the Laravel container, from the src directory",
        "text": "php artisan test"
      },
      {
        "type": "text",
        "title": "5. Quick browser confirmation",
        "text": "<p>Lastly, return to the browser and try submitting a rating without choosing a number. Confirm the form displays a validation error and preserves any comment. Then use a second user account to check that another person’s edit URL gives 403. These manual checks complement the automated ones.</p>"
      },
      {
        "type": "check",
        "text": "Review feature tests pass, including invalid rating, duplicate review, owner edit/delete and forbidden non-owner actions."
      },
      {
        "type": "help",
        "text": "An unknown model class in a test usually means a missing use App\\Models\\... import. If no tests are discovered, verify the file is tests/Feature/ReviewTest.php and the class extends Tests\\TestCase. RefreshDatabase may migrate the configured connection: check phpunit.xml and .env.testing before running it."
      }
    ],
    "q": "Which assertion verifies that a different account cannot edit a review?",
    "options": [
      "assertOk()",
      "assertForbidden()",
      "assertSee(\"Edit\")"
    ],
    "answer": 1,
    "feedback": "assertForbidden() checks that Laravel returned HTTP 403."
  },
  {
    "id": "m07-s01",
    "module": 7,
    "title": "Give users a role",
    "time": "20 min",
    "intro": "Give each account a reader or administrator role, then promote a test account safely.",
    "parts": [
      {
        "type": "text",
        "title": "What you will build",
        "text": "<p>Signing in proves <em>who</em> somebody is (authentication). A <strong>role</strong> describes the kind of access they should have (authorisation). We will use two roles: <code>user</code> and <code>admin</code>. Ordinary registration must never create an admin automatically.</p>"
      },
      {
        "type": "text",
        "title": "1. Add a role to the users table",
        "text": "<p>In your terminal inside <code>src</code>, generate a <strong>new</strong> migration. Do not edit the old users-table migration: it may already have run on your database.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "",
        "text": "php artisan make:migration add_role_to_users_table --table=users"
      },
      {
        "type": "text",
        "title": "Edit the generated migration",
        "text": "<p>Open the new file in <code>database/migrations/</code>. Keep its generated class structure and replace only the <code>up()</code> and <code>down()</code> methods. A default of <code>user</code> ensures existing accounts and future registrations are ordinary users.</p>"
      },
      {
        "type": "code",
        "file": "database/migrations/*_add_role_to_users_table.php · methods",
        "label": "",
        "text": "public function up(): void\n{\n    Schema::table('users', function (Blueprint $table) {\n        $table->string('role')->default('user');\n    });\n}\n\npublic function down(): void\n{\n    Schema::table('users', function (Blueprint $table) {\n        $table->dropColumn('role');\n    });\n}"
      },
      {
        "type": "text",
        "title": "2. Run the migration and inspect your accounts",
        "text": "<p>Use the same MySQL environment as the rest of the course. Run <code>migrate</code> rather than <code>migrate:fresh</code> so you do not discard the work you have already saved.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "",
        "text": "php artisan migrate\nphp artisan tinker"
      },
      {
        "type": "text",
        "title": "3. Promote one test account",
        "text": "<p>In Tinker, find the account you registered earlier. Replace the example address with its actual email. Assign the new role <strong>directly</strong>, then save it. Run each line in order.</p>"
      },
      {
        "type": "code",
        "file": "Tinker · run one line at a time",
        "label": "",
        "text": "$admin = \\App\\Models\\User::where('email', 'your-admin@example.com')->first();\n// If the result is null, check the email address before continuing.\n$admin->role = 'admin';\n$admin->save();\n$admin->fresh()->role;"
      },
      {
        "type": "text",
        "title": "What about User.php?",
        "text": "<p>The column can be read as <code>$user->role</code> without adding it to <code>$fillable</code>. <strong>Do not add <code>role</code> to <code>User::$fillable</code></strong>: a public registration form must not be able to mass-assign somebody the administrator role. The earlier <code>$admin->update(['role' =&gt; 'admin'])</code> approach may silently fail because the field is not fillable; direct assignment followed by <code>save()</code> is the correct choice here.</p>"
      },
      {
        "type": "check",
        "text": "The database has a role column; an ordinary account reports user; your selected test admin reports admin. A newly registered account is a user."
      },
      {
        "type": "help",
        "text": "If Tinker prints null for $admin, check the exact email used at registration. If a migration fails, check its filename and ensure Schema and Blueprint imports remain in the generated file. Never put a role selection field on the registration page."
      }
    ],
    "options": [
      "Editing the account role in the public registration form",
      "Promoting a selected account through a controlled developer action",
      "Making every new user an administrator"
    ],
    "answer": 1,
    "feedback": "Developer-controlled promotion keeps the administrator role away from ordinary registration.",
    "q": "How should an account become an administrator?"
  },
  {
    "id": "m07-s02",
    "module": 7,
    "title": "Protect the book management routes",
    "time": "30 min",
    "intro": "Add one reusable role check and use it to protect book create, edit and delete actions.",
    "parts": [
      {
        "type": "text",
        "title": "Why routes need protection",
        "text": "<p>Hiding an <strong>Add Book</strong> link is not enough. A visitor could still type <code>/books/create</code> or send a POST request. Laravel must check permissions <strong>before the controller runs</strong>. We will allow every signed-in user to browse books, but only an <code>admin</code> to change them.</p>"
      },
      {
        "type": "text",
        "title": "1. Create the middleware class",
        "text": "<p>Run this from the Laravel <code>src</code> directory. Middleware checks a request as it enters the application.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "text": "php artisan make:middleware EnsureUserHasRole"
      },
      {
        "type": "text",
        "title": "2. Check the role",
        "text": "<p>Open <code>app/Http/Middleware/EnsureUserHasRole.php</code> and replace the generated file with the complete class below. The <code>$role</code> argument lets us specify a required role on a route. If the logged-in user does not have that role, Laravel returns <strong>403 Forbidden</strong>.</p>"
      },
      {
        "type": "code",
        "file": "app/Http/Middleware/EnsureUserHasRole.php · complete class",
        "text": "<?php\n\nnamespace App\\Http\\Middleware;\n\nuse Closure;\nuse Illuminate\\Http\\Request;\nuse Symfony\\Component\\HttpFoundation\\Response;\n\nclass EnsureUserHasRole\n{\n    public function handle(Request $request, Closure $next, string $role): Response\n    {\n        abort_unless($request->user()?->role === $role, 403);\n\n        return $next($request);\n    }\n}"
      },
      {
        "type": "text",
        "title": "3. Register a short name for this middleware",
        "text": "<p>Open <code>bootstrap/app.php</code>. Near the top, add the <code>use</code> line below beside the other imports. This lets Laravel refer to the class by name.</p>"
      },
      {
        "type": "code",
        "file": "bootstrap/app.php · add alongside existing imports",
        "text": "use App\\Http\\Middleware\\EnsureUserHasRole;"
      },
      {
        "type": "text",
        "title": "Find the existing <code>withMiddleware</code> callback",
        "text": "<p>Farther down in <code>bootstrap/app.php</code>, you will find one <code>-&gt;withMiddleware(...)</code> callback. In a fresh Laravel 12 project it looks like the first example below. <strong>Edit this existing callback; do not create a second one.</strong></p>"
      },
      {
        "type": "code",
        "file": "bootstrap/app.php · before your change",
        "text": "->withMiddleware(function (Middleware $middleware): void {\n    //\n})"
      },
      {
        "type": "text",
        "title": "Replace that callback with this version",
        "text": "<p>Only the two <code>alias()</code> lines are new. Keep the surrounding <code>withRouting</code> and <code>withExceptions</code> calls in the file untouched. The alias means <code>role:admin</code> on a route runs <code>EnsureUserHasRole</code>, passing <code>admin</code> as its required role.</p>"
      },
      {
        "type": "code",
        "file": "bootstrap/app.php · complete updated withMiddleware callback",
        "text": "->withMiddleware(function (Middleware $middleware): void {\n    $middleware->alias([\n        'role' => EnsureUserHasRole::class,\n    ]);\n})"
      },
      {
        "type": "text",
        "title": "4. Put administrator routes before the general book routes",
        "text": "<p>Open <code>routes/web.php</code>. <strong>Inside the existing <code>auth</code> group</strong>, find the current <code>Route::resource('books', ...)</code> line from Module 05. Replace <em>only that book resource route</em> with the following two blocks. Keep all other routes, including authors and reviews, unchanged.</p><p><strong>Order matters:</strong> the specific <code>/books/create</code> route must be registered before the parameterised <code>/books/{book}</code> route. Otherwise Laravel may treat the word <code>create</code> as a book ID and return 404.</p>"
      },
      {
        "type": "code",
        "file": "routes/web.php · inside the existing auth group, replace books resource route",
        "text": "// More specific administrator actions must come first.\nRoute::middleware('role:admin')->group(function () {\n    Route::resource('books', BookController::class)\n        ->only(['create', 'store', 'edit', 'update', 'destroy']);\n});\n\n// General browsing routes come afterwards.\nRoute::resource('books', BookController::class)\n    ->only(['index', 'show']);"
      },
      {
        "type": "text",
        "title": "5. Try it out with two different accounts",
        "text": "<p><strong>First, sign in as your administrator.</strong> Open the Books page, choose Add Book and create a test book. Open that book, edit its title, save your changes, then delete the test book. All three actions should work.</p><p><strong>Next, sign out and sign in as an ordinary user</strong> whose <code>role</code> is <code>user</code>. You should still be able to see the list of books and open a book page. For now, the Add/Edit/Delete links may still be visible; we will hide them in 07-04.</p><p>Try visiting <code>/books/create</code> directly. You should see <strong>403 Forbidden</strong>, not the form. Try editing an existing book at <code>/books/1/edit</code> (replace <code>1</code> with a real book ID). That should also be forbidden. If you want to check delete protection, use a test request rather than deleting a real record. An ordinary user must never be able to create, change or delete a book.</p><p><strong>Why 403?</strong> It means Laravel understood the request but refused it because this account does not have permission. If <code>/books/create</code> returns <strong>404</strong> for an administrator, check the route order: the admin-only resource routes must appear <em>before</em> the general <code>books/{book}</code> route.</p><p>For a further check, run the commands below. The route list helps you inspect the routes, but the two-account browser test is the important part.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "text": "php artisan route:clear\nphp artisan route:list --path=books"
      },
      {
        "type": "check",
        "text": "The admin can open /books/create. An ordinary user receives 403 for book-management routes. Both accounts can browse books, and /books/create is not accidentally matched as /books/{book}."
      },
      {
        "type": "help",
        "text": "If the alias is unknown, check the import and confirm it is inside the <em>existing</em> withMiddleware callback in bootstrap/app.php. If everyone gets 403, check the Tinker role assignment from 07-01. If /books/create returns 404, move the administrator routes above the index/show resource registration and run route:clear."
      }
    ],
    "options": [
      "Otherwise /books/create may match /books/{book} and return 404",
      "Because administrator routes must be in a different controller",
      "Because middleware only runs on the first route in a file"
    ],
    "answer": 0,
    "feedback": "Laravel registers and matches route patterns in order. The fixed /books/create route needs to precede the dynamic /books/{book} route.",
    "q": "Why must the admin book routes be registered before the general show route?"
  },
  {
    "id": "m07-s03",
    "module": 7,
    "title": "Understand and verify review ownership",
    "time": "18 min",
    "intro": "Check that people can edit or delete their own reviews, but never somebody else’s.",
    "parts": [
      {
        "type": "text",
        "title": "A different kind of permission",
        "text": "<p>Roles control broad access, such as who can manage the book catalogue. <strong>Ownership</strong> controls individual records: two people may both have the <code>user</code> role, but each should change <em>only their own</em> reviews. The Book Reviews app already implements this in Module 06. We will inspect and test it rather than write another controller.</p>"
      },
      {
        "type": "text",
        "title": "1. Find the check that protects reviews",
        "text": "<p>Open <code>app/Http/Controllers/ReviewController.php</code>. Locate the <code>authorizeOwner()</code> method you added in Module 06. It compares the review’s stored <code>user_id</code> with the ID of the account currently signed in.</p>"
      },
      {
        "type": "code",
        "file": "app/Http/Controllers/ReviewController.php · existing method (do not add it again)",
        "text": "private function authorizeOwner(Review $review): void\n{\n    if ($review->user_id !== auth()->id()) {\n        abort(403);\n    }\n}"
      },
      {
        "type": "text",
        "title": "2. Check which actions call it",
        "text": "<p>In the <strong>same controller</strong>, confirm that <code>edit()</code>, <code>update()</code> and <code>destroy()</code> each call <code>$this-&gt;authorizeOwner($review)</code> <strong>before</strong> returning a form, saving changes or deleting data. The check must happen on the server; hiding an Edit button alone is not sufficient.</p>"
      },
      {
        "type": "code",
        "file": "ReviewController.php · example from the existing update() action",
        "text": "public function update(Request $request, Review $review)\n{\n    $this->authorizeOwner($review);\n\n    $review->update($request->validate($this->validationRules()));\n\n    return redirect()->route('books.show', $review->book);\n}"
      },
      {
        "type": "text",
        "title": "3. Make sure users only see their own controls",
        "text": "<p>Open <code>resources/views/reviews/partials/review.blade.php</code>. Module 06 already wraps the <strong>Edit</strong> and <strong>Delete</strong> controls in this condition. It improves the user experience, but the controller check above is still the security rule.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/reviews/partials/review.blade.php · existing condition (do not duplicate)",
        "text": "@if ($review->user_id === auth()->id())\n    {{-- Existing Edit link and Delete form --}}\n@endif"
      },
      {
        "type": "text",
        "title": "4. Test with two users",
        "text": "<p>Sign in as User A and write a review. Sign out, then sign in as User B and open that same book. User B should see the review but not its Edit/Delete controls. Try the review’s edit URL directly as User B; Laravel should return <strong>403</strong>. Sign back in as User A and confirm editing and deleting your own review still work.</p><p>The checks above already exist. <strong>You do not need to add new review routes or rewrite the ReviewController.</strong></p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "text": "php artisan test --filter=ReviewTest"
      },
      {
        "type": "check",
        "text": "A user may edit and delete their own reviews. Another user cannot edit or delete that review through the interface or a direct request (403). Review feature tests still pass."
      },
      {
        "type": "help",
        "text": "A 404 usually means the review ID does not exist; a 403 means the record exists but belongs to somebody else. If other users can update a review, confirm the ownership check runs in update() and destroy(), not just edit()."
      }
    ],
    "options": [
      "Because direct HTTP requests can still reach update()",
      "Because Blade only works for admin accounts",
      "Because every review belongs to an administrator"
    ],
    "answer": 0,
    "feedback": "The interface hides controls for usability; the controller must enforce ownership when requests arrive.",
    "q": "Why does update() need the ownership check even if another user cannot see the Edit button?"
  },
  {
    "id": "m07-s04",
    "module": 7,
    "title": "Show the right controls and test book roles",
    "time": "25 min",
    "intro": "Hide book-management controls from readers and verify that the server blocks unauthorised requests.",
    "parts": [
      {
        "type": "text",
        "title": "Why update the interface?",
        "text": "<p>The middleware in 07-02 protects the routes. Now we will make the interface match those rules: an ordinary user should not see buttons they cannot use. The server-side checks are still essential.</p>"
      },
      {
        "type": "text",
        "title": "1. Show Add Book only to administrators",
        "text": "<p>Open <code>resources/views/books/index.blade.php</code>. Locate the <strong>existing</strong> Add Book link. Wrap it inside this condition, without removing the existing link markup.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/books/index.blade.php · wrap the existing Add Book link",
        "text": "@if (auth()->user()?->role === 'admin')\n    {{-- Your existing Add Book link goes here. --}}\n@endif"
      },
      {
        "type": "text",
        "title": "2. Show Edit and Delete Book only to administrators",
        "text": "<p>Open <code>resources/views/books/show.blade.php</code>. Wrap the existing edit link and delete form in the same condition. This should not hide book details or reviews from ordinary users.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/books/show.blade.php · wrap existing management controls",
        "text": "@if (auth()->user()?->role === 'admin')\n    {{-- Your existing Edit Book link and Delete Book form go here. --}}\n@endif"
      },
      {
        "type": "text",
        "title": "3. Keep the earlier book tests meaningful",
        "text": "<p>Some of your Module 05 feature tests create an ordinary user before making an authorised <strong>store, edit, update or delete</strong> request. Those requests now require an administrator. Change the user factory in the <em>management tests only</em>; keep tests for ordinary book browsing as ordinary users.</p>"
      },
      {
        "type": "code",
        "file": "tests/Feature/BookTest.php · in authorised book management tests",
        "text": "$user = User::factory()->create(['role' => 'admin']);"
      },
      {
        "type": "text",
        "title": "4. Write a role-access feature test",
        "text": "<p>Generate a fresh feature test, then replace its contents with the complete example. The tests check <em>actual HTTP responses</em>, including a reader trying the protected URLs directly. They also confirm administrators can open the management forms.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "text": "php artisan make:test RoleAccessTest"
      },
      {
        "type": "code",
        "file": "tests/Feature/RoleAccessTest.php · complete file",
        "text": "<?php\n\nnamespace Tests\\Feature;\n\nuse App\\Models\\Book;\nuse App\\Models\\User;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Tests\\TestCase;\n\nclass RoleAccessTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_readers_can_browse_but_cannot_manage_books(): void\n    {\n        $reader = User::factory()->create();\n        $book = Book::factory()->create();\n\n        $this->actingAs($reader)->get(route('books.index'))->assertOk();\n        $this->actingAs($reader)->get(route('books.show', $book))->assertOk();\n        $this->actingAs($reader)->get(route('books.create'))->assertForbidden();\n        $this->actingAs($reader)->get(route('books.edit', $book))->assertForbidden();\n        $this->actingAs($reader)->post(route('books.store'), [\n            'title' => 'Not allowed', 'year' => 2020,\n        ])->assertForbidden();\n        $this->actingAs($reader)->put(route('books.update', $book), [\n            'title' => 'Changed', 'year' => 2020,\n        ])->assertForbidden();\n        $this->actingAs($reader)->delete(route('books.destroy', $book))\n            ->assertForbidden();\n    }\n\n    public function test_administrators_can_open_book_management_forms(): void\n    {\n        $admin = User::factory()->create(['role' => 'admin']);\n        $book = Book::factory()->create();\n\n        $this->actingAs($admin)->get(route('books.create'))->assertOk();\n        $this->actingAs($admin)->get(route('books.edit', $book))->assertOk();\n    }\n}"
      },
      {
        "type": "text",
        "title": "5. Run the tests and compare two accounts",
        "text": "<p>Run the role tests, review tests and then the whole suite. In the browser, confirm an ordinary user can browse and review books but cannot see Add/Edit/Delete Book controls. Confirm an administrator can use those controls. Your review ownership checks should still work for both roles.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "text": "php artisan test --filter=RoleAccessTest\nphp artisan test --filter=BookTest\nphp artisan test --filter=ReviewTest\nphp artisan test"
      },
      {
        "type": "text",
        "title": "Apply the same idea to authors later",
        "text": "<p>The catalogue currently provides author <strong>index</strong> and <strong>show</strong> pages. A similar pattern could restrict any future author management routes to administrators, using the same role middleware and Blade conditions. <strong>We are not adding Author CRUD in this lesson.</strong> You can develop that independently if your project needs it.</p>"
      },
      {
        "type": "check",
        "text": "Readers can browse and write their own reviews but cannot manage books. Administrators can manage books. Neither role can edit or delete someone else’s review. All three test classes pass."
      },
      {
        "type": "help",
        "text": "If BookTest starts returning 403, confirm the test user has the admin role for modification cases. If RoleAccessTest expects 403 but sees 404 for /books/create, confirm the order of resource routes in 07-02. If the interface still shows Add Book for ordinary users, check that you wrapped the existing link in the Blade condition."
      }
    ],
    "options": [
      "Hiding a button is sufficient to protect a route",
      "Middleware protects book actions, and a separate ownership check protects each user’s reviews",
      "Administrators automatically own all reviews"
    ],
    "answer": 1,
    "feedback": "Different rules protect different resources: role middleware for book management and per-review ownership checks for editing and deleting reviews.",
    "q": "Which statement is correct about book-management buttons and review ownership?"
  },
  {
    "id": "m08-s01",
    "module": 8,
    "title": "Search books by title",
    "time": "35 min",
    "intro": "Add a search box that finds books by their titles and remembers what the user typed.",
    "parts": [
      {
        "type": "text",
        "title": "What you will add",
        "text": "<p>Your catalogue now contains books and reviews. In this activity you will add a search box that finds books by title. Author and year search come in the next activity.</p>"
      },
      {
        "type": "text",
        "title": "1. Add title search to the Book model",
        "text": "<p>Open <code>app/Models/Book.php</code>. Add the import below with the other imports near the top. Then add the <code>scopeSearch()</code> method <strong>inside the Book class</strong>, before its final closing brace. Keep all existing fields and relationships.</p>"
      },
      {
        "type": "code",
        "file": "app/Models/Book.php · add to imports",
        "label": "",
        "text": "use Illuminate\\Database\\Eloquent\\Builder;"
      },
      {
        "type": "code",
        "file": "app/Models/Book.php · add method inside class",
        "label": "",
        "text": "public function scopeSearch(Builder $query, ?string $term): Builder\n{\n    if (! $term) {\n        return $query;\n    }\n\n    return $query->where('title', 'like', '%'.$term.'%');\n}"
      },
      {
        "type": "text",
        "title": "What the scope does",
        "text": "<p>A Laravel <strong>local scope</strong> is a reusable piece of a database query. A method named <code>scopeSearch</code> can be called as <code>Book::search($term)</code>. If the search box is empty, it returns the unfiltered query.</p>"
      },
      {
        "type": "text",
        "title": "2. Update the catalogue controller",
        "text": "<p>Open <code>app/Http/Controllers/BookController.php</code>. This controller already imports <code>Illuminate\\Http\\Request</code> from Module 05. If that import is missing in your file, add it. <strong>Replace only the existing <code>index()</code> method</strong> with this method. Leave create, show, store, edit, update and destroy unchanged.</p>"
      },
      {
        "type": "code",
        "file": "app/Http/Controllers/BookController.php · import if needed",
        "label": "",
        "text": "use Illuminate\\Http\\Request;"
      },
      {
        "type": "code",
        "file": "app/Http/Controllers/BookController.php · replace index() only",
        "label": "",
        "text": "public function index(Request $request)\n    {\n        // Eager-load authors, and aggregate the review count/average rating\n        // in the same query (withCount/withAvg), rather than loading every\n        // review row just to print a number - avoids the N+1 problem without\n        // pulling data the listing never displays.\n        $books = Book::with('authors')\n            ->withCount('reviews')\n            ->withAvg('reviews', 'rating')\n            ->search($request->query('search'))\n            ->orderBy('title')\n            ->paginate(12)\n            ->withQueryString();\n\n        return view('books.index', compact('books'));\n    }",
        "highlightLines": [
          1,
          3,
          4,
          5,
          6,
          10,
          12,
          13
        ]
      },
      {
        "type": "text",
        "title": "How the request reaches the query",
        "text": "<p>The controller reads <code>?search=...</code> from the URL, applies your scope and keeps any query-string value when building pagination links. <code>withCount()</code> and <code>withAvg()</code> supply the review statistics already shown on your book cards.</p>"
      },
      {
        "type": "text",
        "title": "3. Add the search box to the listing page",
        "text": "<p>Open <code>resources/views/books/index.blade.php</code>. <strong>Replace the whole file</strong> with the version below. It retains the Add Book link and book cards from earlier lessons, and puts the search form above the list.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/books/index.blade.php",
        "label": "",
        "text": "<x-app-layout>\n    <x-slot name=\"header\">\n        <div class=\"flex items-center justify-between\">\n            <h2 class=\"font-semibold text-xl text-gray-800 leading-tight\">\n                {{ __('Books') }}\n            </h2>\n\n            <a href=\"{{ route('books.create') }}\" class=\"inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700\">\n                {{ __('Add Book') }}\n            </a>\n        </div>\n    </x-slot>\n\n    <div class=\"py-12\">\n        <div class=\"max-w-7xl mx-auto sm:px-6 lg:px-8\">\n            <form method=\"GET\" action=\"{{ route('books.index') }}\" class=\"mb-6 flex gap-3\">\n                <input type=\"search\" name=\"search\" value=\"{{ request('search') }}\" placeholder=\"Search by title...\"\n                       class=\"flex-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500\">\n\n                <button type=\"submit\" class=\"inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700\">\n                    {{ __('Search') }}\n                </button>\n\n                @if (request('search'))\n                    <a href=\"{{ route('books.index') }}\" class=\"inline-flex items-center px-4 py-2 text-xs text-gray-500 hover:text-gray-800 hover:underline\">\n                        {{ __('Clear') }}\n                    </a>\n                @endif\n            </form>\n\n            <div class=\"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6\">\n                @forelse ($books as $book)\n                    @include('books.partials.card', ['book' => $book])\n                @empty\n                    <p class=\"text-gray-600 col-span-full\">\n                        @if (request('search'))\n                            {{ __('No books match \":search\".', ['search' => request('search')]) }}\n                        @else\n                            {{ __('No books in the catalogue yet.') }}\n                        @endif\n                    </p>\n                @endforelse\n            </div>\n\n            <div class=\"mt-6\">\n                {{ $books->links() }}\n            </div>\n        </div>\n    </div>\n</x-app-layout>",
        "highlightLines": [
          3,
          4,
          5,
          6,
          8,
          9,
          10,
          11,
          16,
          17,
          18,
          20,
          21,
          22,
          24,
          25,
          26,
          27,
          28,
          29,
          35,
          36,
          37,
          38,
          39,
          40,
          41
        ]
      },
      {
        "type": "text",
        "title": "Why this form uses GET",
        "text": "<p>The search form uses <code>GET</code> because it only retrieves records. That gives you a normal URL like <code>/books?search=Dune</code>, which you can bookmark or share. No CSRF token is needed for this read-only GET form.</p>"
      },
      {
        "type": "text",
        "title": "4. Try the new search in your browser",
        "text": "<p>Open <code>http://localhost:8080/books</code> while logged in. Search for part of a title you can see in your catalogue. To make a predictable example, create a book titled <strong>Dune</strong> using Add Book or through Tinker. Search for <strong>Dune</strong>, then use Clear to return to all books. The search field should keep what you typed.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Optional: add a book with a known title (run the PHP line inside Tinker)",
        "text": "php artisan tinker\n# Once Tinker opens, run:\n\\App\\Models\\Book::factory()->create(['title' => 'Dune']);"
      },
      {
        "type": "check",
        "text": "Searching at /books?search=Dune shows the matching book, the text remains in the search field, and Clear returns to the full catalogue."
      },
      {
        "type": "help",
        "text": "If search() is unknown, check that the Book model method is named scopeSearch and that the Builder import is present. If Request is unknown, add use Illuminate\\Http\\Request; to BookController. If no books appear, confirm you have test records and are signed in."
      }
    ],
    "q": "What is the purpose of scopeSearch() on the Book model?",
    "options": [
      "To create a separate table.",
      "To make a reusable search filter for book queries.",
      "To log a user out."
    ],
    "answer": 1,
    "feedback": "A local scope is a reusable query filter."
  },
  {
    "id": "m08-s02",
    "module": 8,
    "title": "Search by author and year",
    "time": "25 min",
    "intro": "Extend the search box so it also finds books by author name or publication year.",
    "parts": [
      {
        "type": "text",
        "title": "Building on 07-01",
        "text": "<p>The title search is working. Now let the same search box match an author’s name or an exact publication year. You will change the <code>Book</code> model, not create another form.</p>"
      },
      {
        "type": "text",
        "title": "1. Extend the scope",
        "text": "<p>Open <code>app/Models/Book.php</code>. Find <code>scopeSearch()</code> from 07-01 and <strong>replace that method only</strong> with the following version. Keep the existing Book relationships, <code>use Illuminate\\Database\\Eloquent\\Builder;</code> and other imports.</p>"
      },
      {
        "type": "code",
        "file": "app/Models/Book.php · replace scopeSearch() only",
        "label": "",
        "text": "public function scopeSearch(Builder $query, ?string $term): Builder\n    {\n        if (! $term) {\n            return $query;\n        }\n\n        return $query->where(function (Builder $query) use ($term) {\n            $query->where('title', 'like', '%'.$term.'%')\n                ->orWhereHas('authors', fn (Builder $query) => $query->where('name', 'like', '%'.$term.'%'));\n\n            if (is_numeric($term)) {\n                $query->orWhere('year', $term);\n            }\n        });\n    }",
        "highlightLines": [
          2,
          3,
          4,
          5,
          7,
          8,
          9,
          11,
          12,
          13,
          14
        ]
      },
      {
        "type": "text",
        "title": "How the three searches work",
        "text": "<code>whereHas('authors')</code> searches author records related to a book through the existing many-to-many relationship. The conditions are wrapped in one <code>where(function ...)</code> so the title, author and year alternatives stay grouped together. A numeric search term is also checked against the year."
      },
      {
        "type": "text",
        "title": "2. Update the hint in the search box",
        "text": "<p>Open <code>resources/views/books/index.blade.php</code>. Change the placeholder on the search input from <code>Search by title...</code> to <code>Search by title, author, or year...</code>. No route or controller changes are needed.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/books/index.blade.php · input attribute",
        "label": "",
        "text": "placeholder=\"Search by title, author, or year...\""
      },
      {
        "type": "text",
        "title": "3. Try each search type",
        "text": "<p>In the browser, open <code>/books</code> and search using (a) a known title, (b) an author name from <code>/authors</code>, and (c) a four-digit year for a book you can see. Each should return the relevant book. A phrase that matches nothing should show the empty-results message.</p>"
      },
      {
        "type": "text",
        "title": "If the author search returns no matches",
        "text": "<p>If your named test book is not associated with an author, use an existing seeded book for the author search or attach an author through Tinker. The relationship is what makes the author search work.</p>"
      },
      {
        "type": "check",
        "text": "The same search field finds a book by title, a related author’s name, or its publication year."
      },
      {
        "type": "help",
        "text": "Check the Book::authors() relationship and author_book pivot rows if author search fails. Ensure the replacement scope has all its closing parentheses and braces. A search for year uses an exact numeric comparison, not a partial match."
      }
    ],
    "q": "Which Eloquent method searches a related author record?",
    "options": [
      "whereHas(\"authors\", ...)",
      "orderBy(\"title\")",
      "paginate(12)"
    ],
    "answer": 0,
    "feedback": "whereHas() applies a condition to related author records."
  },
  {
    "id": "m08-s03",
    "module": 8,
    "title": "Test the catalogue search",
    "time": "30 min",
    "intro": "Add tests that check the search works both in Eloquent and on the actual catalogue page.",
    "parts": [
      {
        "type": "text",
        "title": "What you will test",
        "text": "<p>You have checked searching in the browser. Now add tests so that future changes to the model and catalogue controller do not silently break title, author or year searches.</p>"
      },
      {
        "type": "text",
        "title": "1. Prepare the model tests",
        "text": "<p>Open your existing <code>tests/Unit/BookTest.php</code> from Module 02. It should already contain a <code>BookTest</code> class. Confirm these imports are present; add any that are missing. <strong>Do not create a second BookTest class.</strong></p>"
      },
      {
        "type": "code",
        "file": "tests/Unit/BookTest.php · imports to check",
        "label": "",
        "text": "use App\\Models\\Author;\nuse App\\Models\\Book;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;"
      },
      {
        "type": "text",
        "title": "2. Add the search-scope tests",
        "text": "<p>Paste the following <strong>three methods inside the existing BookTest class</strong>, immediately before its final closing brace. Do not paste another <code>&lt;?php</code>, namespace or class declaration. The tests check a match, no match and an empty search.</p>"
      },
      {
        "type": "code",
        "file": "tests/Unit/BookTest.php · new methods",
        "label": "",
        "text": "public function test_the_search_scope_matches_a_books_title_an_authors_name_or_its_year(): void\n    {\n        $book = Book::factory()->create(['title' => 'Dune', 'year' => 1965]);\n        $book->authors()->attach(Author::factory()->create(['name' => 'Frank Herbert']));\n\n        $this->assertTrue(Book::search('Dune')->exists());\n        $this->assertTrue(Book::search('Herbert')->exists());\n        $this->assertTrue(Book::search('1965')->exists());\n    }\n\n    public function test_the_search_scope_finds_nothing_for_a_non_matching_term(): void\n    {\n        Book::factory()->create(['title' => 'Dune', 'year' => 1965]);\n\n        $this->assertFalse(Book::search('zzz')->exists());\n    }\n\n    public function test_the_search_scope_with_a_blank_term_returns_every_book(): void\n    {\n        Book::factory()->count(3)->create();\n\n        $this->assertSame(3, Book::search(null)->count());\n        $this->assertSame(3, Book::search('')->count());\n    }"
      },
      {
        "type": "text",
        "title": "3. Add browser-response tests",
        "text": "<p>Open your existing <code>tests/Feature/BookTest.php</code> from Module 04/05. Ensure it imports <code>Author</code>, <code>Book</code> and <code>User</code>. Then add these three test methods inside its existing class. They make HTTP requests and check that the correct book appears on the page.</p>"
      },
      {
        "type": "code",
        "file": "tests/Feature/BookTest.php · imports to check",
        "label": "",
        "text": "use App\\Models\\Author;\nuse App\\Models\\Book;\nuse App\\Models\\User;"
      },
      {
        "type": "code",
        "file": "tests/Feature/BookTest.php · new methods",
        "label": "",
        "text": "public function test_the_index_page_search_matches_a_books_title(): void\n    {\n        $user = User::factory()->create();\n        Book::factory()->create(['title' => 'Dune']);\n        Book::factory()->create(['title' => 'Some Other Title']);\n\n        $response = $this->actingAs($user)->get(route('books.index', ['search' => 'Dune']));\n\n        $response->assertOk();\n        $response->assertSee('Dune');\n        $response->assertDontSee('Some Other Title');\n    }\n\n    public function test_the_index_page_search_matches_an_authors_name(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create(['title' => 'Dune']);\n        $book->authors()->attach(Author::factory()->create(['name' => 'Frank Herbert']));\n        Book::factory()->create(['title' => 'Some Other Title']);\n\n        $response = $this->actingAs($user)->get(route('books.index', ['search' => 'Herbert']));\n\n        $response->assertOk();\n        $response->assertSee('Dune');\n        $response->assertDontSee('Some Other Title');\n    }\n\n    public function test_the_index_page_search_matches_a_year(): void\n    {\n        $user = User::factory()->create();\n        Book::factory()->create(['title' => 'Dune', 'year' => 1965]);\n        Book::factory()->create(['title' => 'Some Other Title', 'year' => 1999]);\n\n        $response = $this->actingAs($user)->get(route('books.index', ['search' => '1965']));\n\n        $response->assertOk();\n        $response->assertSee('Dune');\n        $response->assertDontSee('Some Other Title');\n    }"
      },
      {
        "type": "text",
        "title": "Avoid duplicate test methods",
        "text": "<p>If the named methods already exist in your file, compare them rather than duplicating them. Adding the same method twice causes a PHP error.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "4. Run the Book tests",
        "text": "php artisan test --filter=BookTest"
      },
      {
        "type": "text",
        "title": "5. Interpret failures",
        "text": "<p>The newly added tests should pass. If an author test fails, confirm the author is attached through <code>$book->authors()->attach(...)</code>. If an HTTP test fails, confirm <code>BookController@index()</code> uses <code>->search($request->query('search'))</code>.</p>"
      },
      {
        "type": "check",
        "text": "The search scope and the catalogue page both pass tests for title, author and year searches."
      },
      {
        "type": "help",
        "text": "If you see a duplicate-method error, remove the extra method in the existing class. If a model is not found, check use App\\Models\\... imports. Run tests with a disposable testing connection; RefreshDatabase may apply migrations."
      }
    ],
    "q": "Why test both the search scope and the /books page?",
    "options": [
      "They test the same PHP line twice.",
      "One tests database filtering and the other tests the HTTP response users see.",
      "Only the HTTP test can create books."
    ],
    "answer": 1,
    "feedback": "The two layers catch different problems."
  },
  {
    "id": "m08-s04",
    "module": 8,
    "title": "Check empty results and pagination",
    "time": "25 min",
    "intro": "Make sure searches with no matches are clear, and page links keep the search term.",
    "parts": [
      {
        "type": "text",
        "title": "The final search checks",
        "text": "<p>A search should remain useful when no results are found or when there are many results. This activity checks both cases and finishes the search tests.</p>"
      },
      {
        "type": "text",
        "title": "1. Check the empty-results message",
        "text": "<p>Open <code>resources/views/books/index.blade.php</code> and find the book list. Your file from 07-01 should already have <code>@forelse</code> / <code>@empty</code> and <code>{{ $books->links() }}</code>. If so, leave it in place. The important part of the empty-state branch is shown below for reference.</p>"
      },
      {
        "type": "code",
        "file": "resources/views/books/index.blade.php · inside the @empty branch",
        "label": "",
        "text": "@empty\n    <p class=\"text-gray-600 col-span-full\">\n        @if (request('search'))\n            {{ __('No books match \":search\".', ['search' => request('search')]) }}\n        @else\n            {{ __('No books in the catalogue yet.') }}\n        @endif\n    </p>\n@endforelse",
        "highlightLines": [
          2,
          3,
          4,
          5,
          6,
          7,
          8
        ]
      },
      {
        "type": "text",
        "title": "2. Check this in the browser",
        "text": "<p>If no book matches, the page should say <strong>No books match \"...\"</strong> rather than suggesting the whole catalogue is empty. The search box should still show the submitted term.</p>"
      },
      {
        "type": "text",
        "title": "3. Add the last search tests",
        "text": "<p>Open <code>tests/Feature/BookTest.php</code>. Add the following two methods <strong>inside the existing class</strong>, before the final closing brace. Keep the other book tests from 07-03.</p>"
      },
      {
        "type": "code",
        "file": "tests/Feature/BookTest.php · two new methods",
        "label": "",
        "text": "public function test_the_index_page_shows_a_message_for_a_non_matching_search(): void\n    {\n        $user = User::factory()->create();\n        Book::factory()->create(['title' => 'Dune']);\n\n        $response = $this->actingAs($user)->get(route('books.index', ['search' => 'zzz']));\n\n        $response->assertOk();\n        $response->assertDontSee('Dune');\n        $response->assertSee('No books match \"zzz\".');\n    }\n\n    public function test_the_search_box_repopulates_with_the_current_search_term(): void\n    {\n        $user = User::factory()->create();\n        Book::factory()->create(['title' => 'Dune']);\n\n        $response = $this->actingAs($user)->get(route('books.index', ['search' => 'Dune']));\n\n        $response->assertSee('value=\"Dune\"', false);\n    }"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "4. Run the tests",
        "text": "php artisan test --filter=BookTest"
      },
      {
        "type": "text",
        "title": "5. Test pagination in your browser",
        "text": "<p>To check pagination manually, you need more than 12 matching books. In Tinker, create 15 with a common word, then search for that word. Go to page 2 and check that <code>search=</code> is still present in the URL. The controller’s <code>withQueryString()</code> keeps that search filter active across pages.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Optional: add 15 matching test books (type the PHP line inside Tinker)",
        "text": "php artisan tinker\n# Inside Tinker:\n\\App\\Models\\Book::factory()->count(15)->create(['title' => 'Workshop sample']);"
      },
      {
        "type": "text",
        "title": "6. Clean up if needed",
        "text": "<p>After testing, you can remove those temporary records individually or simply leave them in your disposable development database. Do not run <code>migrate:fresh</code> just to clean up if you want to keep other work.</p>"
      },
      {
        "type": "check",
        "text": "Unmatched searches show a helpful message, the search field remembers the term, and page 2 keeps the same search in the URL."
      },
      {
        "type": "help",
        "text": "If page 2 loses the search, make sure the BookController paginator ends in ->paginate(12)->withQueryString(). If the empty message never appears, check the @forelse/@empty section in books/index.blade.php."
      }
    ],
    "q": "What keeps the search term in pagination links?",
    "options": [
      "withQueryString()",
      "@csrf",
      "Route::resource()"
    ],
    "answer": 0,
    "feedback": "withQueryString() carries query-string parameters into generated pagination links."
  },
  {
    "id": "m09-s01",
    "module": 9,
    "title": "Check coverage of My Reviews",
    "time": "30 min",
    "intro": "Finish the feature tests so the personal reviews page is checked as carefully as book and review actions.",
    "parts": [
      {
        "type": "text",
        "title": "What we are checking",
        "text": "<p>Before finishing, review whether each feature has a test. Your review tests cover creating, editing and deleting, but the My Reviews page needs its own tests. You will add these to the same file you created in 06-04.</p>"
      },
      {
        "type": "text",
        "title": "1. Check the existing tests",
        "text": "<p>In a terminal in the Laravel <code>src</code> directory, run the review feature tests first. This gives you a starting point before adding anything.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Run in the Laravel container, from the src directory",
        "text": "php artisan test --filter=ReviewTest"
      },
      {
        "type": "text",
        "title": "2. Test My Reviews",
        "text": "<p>Open <code>tests/Feature/ReviewTest.php</code>. The file should already import <code>Book</code>, <code>Review</code> and <code>User</code> and use <code>RefreshDatabase</code>. Add these four new methods <strong>inside the existing ReviewTest class</strong>. Do not replace the methods from 06-04.</p>"
      },
      {
        "type": "code",
        "file": "tests/Feature/ReviewTest.php · add four methods",
        "label": "",
        "text": "public function test_guests_are_redirected_to_login_from_my_reviews(): void\n    {\n        $response = $this->get(route('reviews.mine'));\n\n        $response->assertRedirect(route('login', absolute: false));\n    }\n\n    public function test_my_reviews_lists_the_users_own_reviews(): void\n    {\n        $user = User::factory()->create();\n        $book = Book::factory()->create(['title' => 'Dune']);\n        Review::factory()->create([\n            'book_id' => $book->id,\n            'user_id' => $user->id,\n            'rating' => 5,\n            'comment' => 'A genuine classic.',\n        ]);\n\n        $response = $this->actingAs($user)->get(route('reviews.mine'));\n\n        $response->assertOk();\n        $response->assertSee('Dune');\n        $response->assertSee('A genuine classic.');\n        $response->assertSee('5 / 5');\n    }\n\n    public function test_my_reviews_does_not_list_another_users_reviews(): void\n    {\n        $user = User::factory()->create();\n        $someoneElse = User::factory()->create();\n        Book::factory()->create(['title' => 'My Book'])\n            ->reviews()->create(['user_id' => $user->id, 'rating' => 4]);\n        Book::factory()->create(['title' => 'Someone Elses Book'])\n            ->reviews()->create(['user_id' => $someoneElse->id, 'rating' => 2]);\n\n        $response = $this->actingAs($user)->get(route('reviews.mine'));\n\n        $response->assertSee('My Book');\n        $response->assertDontSee('Someone Elses Book');\n    }\n\n    public function test_my_reviews_shows_the_most_recently_written_review_first(): void\n    {\n        $user = User::factory()->create();\n        $older = Book::factory()->create(['title' => 'Older Review']);\n        $newer = Book::factory()->create(['title' => 'Newer Review']);\n        Review::factory()->create([\n            'book_id' => $older->id,\n            'user_id' => $user->id,\n            'created_at' => now()->subDay(),\n        ]);\n        Review::factory()->create([\n            'book_id' => $newer->id,\n            'user_id' => $user->id,\n            'created_at' => now(),\n        ]);\n\n        $response = $this->actingAs($user)->get(route('reviews.mine'));\n\n        $response->assertSeeInOrder(['Newer Review', 'Older Review']);\n    }\n\n    public function test_my_reviews_shows_a_message_when_the_user_has_no_reviews(): void\n    {\n        $user = User::factory()->create();\n\n        $response = $this->actingAs($user)->get(route('reviews.mine'));\n\n        $response->assertOk();\n        $response->assertSee(\"You haven't reviewed any books yet.\");\n    }"
      },
      {
        "type": "text",
        "title": "What the tests prove",
        "text": "<p>These five tests cover a guest redirect, the current user’s reviews, hiding another user’s reviews, newest-first ordering, and an empty-state message.</p>"
      },
      {
        "type": "text",
        "title": "3. Run the checks",
        "text": "<p>Run just this test class again, then the whole suite. You should see the new tests pass as well as the earlier create, edit and delete tests. If one fails, check the <code>mine()</code> query and the <code>reviews.mine</code> Blade page introduced in 06-03.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Run in the Laravel container, from the src directory",
        "text": "php artisan test --filter=ReviewTest\nphp artisan test"
      },
      {
        "type": "text",
        "title": "4. Check in the browser",
        "text": "<p>As a final manual check, sign in with each of two test accounts and open <code>http://localhost:8080/my-reviews</code>. Each account should see only its own reviews. The address should redirect to Login when you are signed out.</p>"
      },
      {
        "type": "check",
        "text": "My Reviews has automated checks for authentication, ownership, ordering and the empty state, and the full suite still passes."
      },
      {
        "type": "help",
        "text": "If you get a duplicate method error, do not add the same test twice. If the guest test returns 200 instead of redirecting, verify the /my-reviews route is inside Route::middleware('auth'). If records from other users appear, use auth()->user()->reviews() rather than Review::all()."
      }
    ],
    "q": "Which test is most important for privacy on the My Reviews page?",
    "options": [
      "The page displays a heading.",
      "The page does not show another user’s reviews.",
      "The page uses pagination."
    ],
    "answer": 1,
    "feedback": "The ownership test confirms another account’s records stay hidden."
  },
  {
    "id": "m09-s02",
    "module": 9,
    "title": "Check database queries as the app grows",
    "time": "35 min",
    "intro": "Add tests to catch unnecessary database queries when showing more books and reviews.",
    "parts": [
      {
        "type": "text",
        "title": "Why this matters",
        "text": "<p>If a catalogue loads one extra database query for every book or review displayed, it can get much slower as the data grows. This is called the <strong>N+1 query problem</strong>. Here you will add a test that checks the number of database queries stays steady as more records are displayed.</p>"
      },
      {
        "type": "text",
        "title": "1. Review the catalogue query",
        "text": "<p>Eloquent <code>with()</code> loads related models in advance. In the completed controller code, <code>with('authors')</code>, <code>withCount('reviews')</code> and <code>withAvg('reviews', 'rating')</code> are used to avoid repeated database lookups in the book listing. Your <code>BookController@index()</code> from 07-01 already contains these calls.</p>"
      },
      {
        "type": "code",
        "file": "app/Http/Controllers/BookController.php · excerpt",
        "label": "",
        "text": "Book::with('authors')\n    ->withCount('reviews')\n    ->withAvg('reviews', 'rating')\n    ->search($request->query('search'))\n    ->orderBy('title')\n    ->paginate(12)\n    ->withQueryString();"
      },
      {
        "type": "text",
        "title": "2. Generate a query-count test",
        "text": "<p>Create a new feature test file. The <code>--unit</code> flag is <strong>not</strong> used because this test makes HTTP requests.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Run in the Laravel container, from the src directory",
        "text": "php artisan make:test QueryCountTest"
      },
      {
        "type": "text",
        "title": "3. Add the complete test class",
        "text": "<p>Open <code>tests/Feature/QueryCountTest.php</code> and replace its contents with the following complete class. It includes the required imports, five tests and two helper methods. <code>seedBooks()</code> builds sample data; <code>countQueries()</code> measures database activity during each page request.</p>"
      },
      {
        "type": "code",
        "file": "tests/Feature/QueryCountTest.php",
        "label": "",
        "text": "<?php\n\nnamespace Tests\\Feature;\n\nuse App\\Models\\Author;\nuse App\\Models\\Book;\nuse App\\Models\\Review;\nuse App\\Models\\User;\nuse Illuminate\\Foundation\\Testing\\RefreshDatabase;\nuse Illuminate\\Support\\Facades\\DB;\nuse Tests\\TestCase;\n\nclass QueryCountTest extends TestCase\n{\n    use RefreshDatabase;\n\n    public function test_the_books_index_page_runs_the_same_number_of_queries_regardless_of_catalogue_size(): void\n    {\n        $user = User::factory()->create();\n\n        $this->seedBooks(3);\n        $withThreeBooks = $this->countQueries(fn () => $this->actingAs($user)->get(route('books.index')));\n\n        $this->seedBooks(12); // 15 books total now\n        $withFifteenBooks = $this->countQueries(fn () => $this->actingAs($user)->get(route('books.index')));\n\n        $this->assertSame($withThreeBooks, $withFifteenBooks);\n    }\n\n    public function test_the_books_show_page_runs_the_same_number_of_queries_regardless_of_review_count(): void\n    {\n        $user = User::factory()->create();\n\n        $fewReviews = Book::factory()->create();\n        $fewReviews->authors()->attach(Author::factory()->count(2)->create());\n        Review::factory()->count(3)->create(['book_id' => $fewReviews->id]);\n        $withThreeReviews = $this->countQueries(fn () => $this->actingAs($user)->get(route('books.show', $fewReviews)));\n\n        $manyReviews = Book::factory()->create();\n        $manyReviews->authors()->attach(Author::factory()->count(2)->create());\n        Review::factory()->count(15)->create(['book_id' => $manyReviews->id]);\n        $withFifteenReviews = $this->countQueries(fn () => $this->actingAs($user)->get(route('books.show', $manyReviews)));\n\n        $this->assertSame($withThreeReviews, $withFifteenReviews);\n    }\n\n    public function test_the_authors_index_page_runs_the_same_number_of_queries_regardless_of_author_count(): void\n    {\n        $user = User::factory()->create();\n\n        Author::factory()->count(3)->create();\n        $withThreeAuthors = $this->countQueries(fn () => $this->actingAs($user)->get(route('authors.index')));\n\n        Author::factory()->count(12)->create(); // 15 authors total now\n        $withFifteenAuthors = $this->countQueries(fn () => $this->actingAs($user)->get(route('authors.index')));\n\n        $this->assertSame($withThreeAuthors, $withFifteenAuthors);\n    }\n\n    public function test_the_authors_show_page_runs_the_same_number_of_queries_regardless_of_book_count(): void\n    {\n        $user = User::factory()->create();\n\n        $fewBooks = Author::factory()->create();\n        Book::factory()->count(3)->create()->each(fn (Book $book) => $book->authors()->attach($fewBooks));\n        $withThreeBooks = $this->countQueries(fn () => $this->actingAs($user)->get(route('authors.show', $fewBooks)));\n\n        $manyBooks = Author::factory()->create();\n        Book::factory()->count(15)->create()->each(fn (Book $book) => $book->authors()->attach($manyBooks));\n        $withFifteenBooks = $this->countQueries(fn () => $this->actingAs($user)->get(route('authors.show', $manyBooks)));\n\n        $this->assertSame($withThreeBooks, $withFifteenBooks);\n    }\n\n    public function test_the_my_reviews_page_runs_the_same_number_of_queries_regardless_of_review_count(): void\n    {\n        $fewReviews = User::factory()->create();\n        Review::factory()->count(3)->create(['user_id' => $fewReviews->id]);\n        $withThreeReviews = $this->countQueries(fn () => $this->actingAs($fewReviews)->get(route('reviews.mine')));\n\n        $manyReviews = User::factory()->create();\n        Review::factory()->count(15)->create(['user_id' => $manyReviews->id]);\n        $withFifteenReviews = $this->countQueries(fn () => $this->actingAs($manyReviews)->get(route('reviews.mine')));\n\n        $this->assertSame($withThreeReviews, $withFifteenReviews);\n    }\n\n    /**\n     * Create $count books, each with two shared authors and two reviews -\n     * enough relationships attached per book that an N+1 anywhere in the\n     * chain would show up as a query count that grows with $count.\n     */\n    private function seedBooks(int $count): void\n    {\n        $authors = Author::factory()->count(2)->create();\n\n        Book::factory()->count($count)->create()->each(function (Book $book) use ($authors) {\n            $book->authors()->attach($authors);\n            Review::factory()->count(2)->create(['book_id' => $book->id]);\n        });\n    }\n\n    /**\n     * Run $fn and return exactly how many database queries it issued.\n     */\n    private function countQueries(callable $fn): int\n    {\n        DB::enableQueryLog();\n        DB::flushQueryLog();\n\n        $fn();\n\n        $count = count(DB::getQueryLog());\n        DB::disableQueryLog();\n\n        return $count;\n    }\n}"
      },
      {
        "type": "text",
        "title": "How to read the result",
        "text": "<p>The tests compare requests with a small and a larger set of records. The number of SQL queries should remain the same even when there are more books, authors or reviews. The tests check query count, <strong>not</strong> the amount of data sent or exact page load time.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "4. Run the query-count tests",
        "text": "php artisan test --filter=QueryCountTest"
      },
      {
        "type": "text",
        "title": "5. Investigate a failure",
        "text": "<p>If the book listing test fails, check the <code>with(...)</code> and aggregate calls in <code>BookController@index()</code>. If the author page test fails, check <code>AuthorController@show()</code> and the relationships its book-card partial needs. If My Reviews fails, check <code>->with('book')</code> in <code>ReviewController@mine()</code>.</p>"
      },
      {
        "type": "text",
        "title": "Optional experiment",
        "text": "<p>Optionally, in a disposable working copy, remove <code>with('authors')</code> briefly from <code>BookController@index()</code>, run the test and observe whether it fails, then <strong>restore the line immediately</strong>. Do not leave the deliberate performance problem in your project.</p>"
      },
      {
        "type": "check",
        "text": "The five query-count tests pass, and the controller methods load the related data needed by their Blade views."
      },
      {
        "type": "help",
        "text": "If countQueries or seedBooks is undefined, ensure you copied the full class including its private helper methods. If a model class is unknown, check the imports at the top. Never hardcode an expected query count from somebody else’s machine; compare the small and large cases."
      }
    ],
    "q": "What is a sign of an N+1 problem?",
    "options": [
      "Query count increases with each displayed record.",
      "Search works with a blank term.",
      "The page contains a form."
    ],
    "answer": 0,
    "feedback": "N+1 means extra queries often grow with the number of related records displayed."
  },
  {
    "id": "m09-s03",
    "module": 9,
    "title": "Write a short project handoff",
    "time": "15 min",
    "intro": "Describe what you built, how to check it, and what could be improved later.",
    "parts": [
      {
        "type": "text",
        "title": "What you will produce",
        "text": "<p>Good software projects need a clear record of what is finished and what is still an idea. This activity is about documenting your work, not writing another controller or migration.</p>"
      },
      {
        "type": "text",
        "title": "1. Create the handoff file",
        "text": "<p>At the root of your Git working folder, alongside <code>README.md</code> and <code>compose.yaml</code>, create a new Markdown file named <code>HANDOFF.md</code>. Do not replace the project’s existing README or edit the finished reference repository.</p>"
      },
      {
        "type": "code",
        "file": "HANDOFF.md · starter text",
        "label": "",
        "text": "# Book Reviews: handoff notes\n\n## What works now\n- Users can register, sign in and sign out.\n- Signed-in users can browse and search books and authors.\n- Signed-in users can add, edit and delete books.\n- A user can write one review per book, then edit or delete their own review.\n- My Reviews lists only reviews written by the current user.\n\n## What to check before sharing\n- `php artisan test` passes against a safe test database.\n- Main pages work in a browser.\n- `.env` and credentials are not committed.\n\n## Possible future improvements\n- Use Laravel policies for permissions and ownership checks.\n- Add roles for different levels of access.\n- Consider a separate model for different editions of a book.\n\n## Limitations of this version\n- Book editing is available to all signed-in users; it is not restricted by role.\n- Book records do not have separate edition records."
      },
      {
        "type": "text",
        "title": "2. Make the document accurate",
        "text": "<p>Read through the example and update it to reflect <strong>what you have actually completed</strong>. If a feature has not worked during your walkthrough, mark it as incomplete rather than claiming it is finished.</p>"
      },
      {
        "type": "text",
        "title": "3. Explain what is not implemented",
        "text": "<p>Your current review controller uses a direct ownership check and returns 403 when a different user tries to edit or delete a review. Laravel <strong>policies</strong> offer a more structured way of handling these permissions, but are not part of this application’s implementation yet. Likewise, the app currently lets any signed-in user manage books. Roles and more granular permissions would be future work.</p>"
      },
      {
        "type": "text",
        "title": "4. Note a design choice",
        "text": "<p>The book record currently stores fields such as ISBN, publisher and edition number directly. A larger project might model multiple editions separately. That is a possible extension, not something to build now.</p>"
      },
      {
        "type": "text",
        "title": "5. Review the handoff",
        "text": "<p>Open <code>HANDOFF.md</code> in your editor’s Markdown preview and check that the headings and lists display correctly. Confirm that it clearly separates working functionality, known limitations and future ideas.</p>"
      },
      {
        "type": "check",
        "text": "HANDOFF.md describes the working application, known limits and possible next steps without presenting future features as already built."
      },
      {
        "type": "help",
        "text": "If you are unsure whether something is finished, verify it in the browser or with a test first. Avoid copying code for policies or roles from the reference application: those are discussion topics here, not required changes."
      }
    ],
    "q": "Which statement belongs under possible future improvements?",
    "options": [
      "Users can already sign in.",
      "Laravel policies could replace the current ownership helper.",
      "The /books page already lists books."
    ],
    "answer": 1,
    "feedback": "Policies are a possible extension, not a feature this version already implements."
  },
  {
    "id": "m09-s04",
    "module": 9,
    "title": "Verify and save your finished project",
    "time": "25 min",
    "intro": "Run tests, check the app in the browser and commit your completed work.",
    "parts": [
      {
        "type": "text",
        "title": "Before you finish",
        "text": "<p>This final activity is a checklist to confirm the project still works from beginning to end. Run commands in the indicated places and check the browser with a signed-in account.</p>"
      },
      {
        "type": "text",
        "title": "1. Run Laravel checks",
        "text": "<p>In the running Laravel container, from <code>src</code>, check your database migrations, registered routes and test suite. Make sure the test database configuration is safe before running <code>php artisan test</code>.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Laravel container / src",
        "label": "Run in the Laravel container, from the src directory",
        "text": "php artisan migrate:status\nphp artisan route:list\nphp artisan test"
      },
      {
        "type": "text",
        "title": "2. Check the front-end build",
        "text": "<p>Still inside the Laravel workspace, run the front-end build command used during setup. This checks the Blade/Vite styles and JavaScript assets used by Breeze. If your Docker setup runs npm on the host rather than inside the container, use the same method you used in Module 03.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · in src, where npm is installed",
        "label": "",
        "text": "npm run build"
      },
      {
        "type": "text",
        "title": "3. Final browser checklist",
        "text": "<p>In your browser, work through these flows in order. Check that each one finishes without an error.</p>"
      },
      {
        "type": "text",
        "title": "",
        "text": "<ol><li>Register another account or sign in with an existing one. Open <code>/books</code> and <code>/authors</code>.</li><li>Add a book, edit it, upload an image, then delete your temporary book.</li><li>Write, edit and delete a review. Confirm another account cannot edit someone else’s review.</li><li>Open <code>/my-reviews</code>, check that only your reviews appear and that an empty account sees the empty state.</li><li>Search for a title, an author and a year. Check a no-match search and a paginated search.</li><li>Sign out and confirm protected pages redirect to Login.</li></ol>"
      },
      {
        "type": "text",
        "title": "4. Review your Git changes",
        "text": "<p>Leave your handoff notes accurate. From the <strong>Git repository root</strong> (the folder with <code>compose.yaml</code> and <code>src</code>), inspect your changes before committing. The review step is important: do not accidentally add credentials or generated dependencies.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Git repository root",
        "label": "",
        "text": "git status\ngit diff --check\ngit diff --stat"
      },
      {
        "type": "text",
        "title": "5. Save your working version",
        "text": "<p>Stage the files you actually changed, including <code>HANDOFF.md</code> if you created it. The example below stages <code>src</code> and that handoff file, but <strong>review <code>git status</code> before committing</strong>. Keep <code>src/.env</code>, dependency directories and local database files out of Git.</p>"
      },
      {
        "type": "code",
        "file": "Terminal · Git repository root",
        "label": "",
        "text": "git add src HANDOFF.md\ngit status\ngit commit -m \"Complete Book Reviews learning project\""
      },
      {
        "type": "text",
        "title": "6. Confirm you are finished",
        "text": "<p>If Git says a file is ignored or there is nothing to commit, do not force it. Review what has changed. A successful commit is a saved checkpoint, not a substitute for the tests and browser checks above.</p>"
      },
      {
        "type": "check",
        "text": "Laravel tests and route checks pass, the complete browser walkthrough works, the handoff is accurate, and your reviewed project changes are committed without secrets."
      },
      {
        "type": "help",
        "text": "Use the terminal in the correct folder: Artisan and npm from src; Git from the repository root. If tests fail, fix the first named error before proceeding. If the build fails, verify npm dependencies are installed using the setup instructions."
      }
    ],
    "q": "Where should you run git status for the project checkout?",
    "options": [
      "From the Git repository root.",
      "From resources/views/books.",
      "From the MySQL database."
    ],
    "answer": 0,
    "feedback": "Git commands can run from subfolders, but the repository root makes it easiest to review all changes."
  },
  {
    "id": "x10-s01",
    "module": 10,
    "challenge": true,
    "title": "Plan a reading-list data model",
    "time": "35–55 min",
    "intro": "Give every signed-in user a private list of books and their current reading status.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>A signed-in user should be able to add a book to their reading list. The same book can appear on many users’ lists, but no user should see or modify someone else’s statuses.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Start with your completed Module 09 application. Open <code>app/Models/User.php</code>, <code>app/Models/Book.php</code> and <code>database/migrations/</code>. No UI work yet.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Sketch the relationship</strong><p>Draw User ↔ Book. One user saves many books, and a book can be saved by many users. Each connection carries its own status.</p></li><li><strong>Create the table</strong><p>Use <code>php artisan make:migration create_book_user_table</code>. Add <code>user_id</code>, <code>book_id</code>, <code>status</code> and timestamps. Use foreign keys and a composite unique index.</p></li><li><strong>Add both relationships</strong><p>In <code>User.php</code>, add <code>books()</code>; in <code>Book.php</code>, add <code>readers()</code>. Both should use <code>belongsToMany()</code> and expose pivot <code>status</code>.</p></li><li><strong>Experiment in Tinker</strong><p>Run migrations, create two users and a book, then attach that book with different statuses. Update one status and detach the entry.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Which table?",
            "text": "A many-to-many relationship belongs in a junction (pivot) table. Laravel infers the table name <code>book_user</code> from the two model names."
          },
          {
            "title": "What should prevent duplicates?",
            "text": "Use <code>$table-&gt;unique(['user_id', 'book_id'])</code>. Add <code>-&gt;withPivot('status')-&gt;withTimestamps()</code> to both relationships."
          },
          {
            "title": "Small code clue",
            "text": "For one side: <code>return $this-&gt;belongsToMany(Book::class)-&gt;withPivot('status')-&gt;withTimestamps();</code>. The other side points to <code>User::class</code>. In Tinker, investigate <code>$user-&gt;books()-&gt;attach($book-&gt;id, ['status' =&gt; 'reading'])</code>."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>A user can save several books; two users can save the same book.</li><li>The database rejects two rows with the same user–book pair.</li><li>Changing one user’s status does not alter another user’s status.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Add the date a book was finished, without requiring it for books not yet finished.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x10-s02",
    "module": 10,
    "challenge": true,
    "title": "Build the reading-list interface",
    "time": "35–55 min",
    "intro": "Let readers save books and manage their statuses from a personal page.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>Add an action on the book-detail page to save or change its status. Build a “My Reading List” page grouped or filtered by status.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Reuse the routes, forms and Breeze navigation patterns from Modules 04–06. Work in <code>routes/web.php</code>, a new reading-list controller, <code>books/show.blade.php</code> and a new reading-list view.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Design two screens</strong><p>Decide how a signed-in reader chooses a status on a book page, and how “My Reading List” groups books. Include an empty-list state.</p></li><li><strong>Add protected routes</strong><p>Create routes for showing the list, saving/changing a status, and removing an entry inside the existing <code>auth</code> route group.</p></li><li><strong>Write user-scoped actions</strong><p>Use <code>auth()-&gt;user()-&gt;books()</code>, not a user ID from the request. Validate status using a fixed set such as <code>want_to_read</code>, <code>reading</code>, <code>finished</code>.</p></li><li><strong>Connect the interface</strong><p>Create a POST form on the book page with <code>@csrf</code>, and show the list in a new Blade view. Add a desktop and mobile navigation link.</p></li><li><strong>Try full lifecycle</strong><p>Add a book, change its status, remove it and refresh after each action. Sign in as another user and compare.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Look at an existing feature",
            "text": "Study <code>ReviewController</code> and its routes. Your reading-list actions have a similar request → validate → write → redirect structure."
          },
          {
            "title": "Useful relationship methods",
            "text": "Read about <code>syncWithoutDetaching()</code>, <code>updateExistingPivot()</code> and <code>detach()</code>. A saved book should not generate duplicate pivot rows."
          },
          {
            "title": "Small code clue",
            "text": "Validate with <code>$request-&gt;validate(['status' =&gt; 'required|in:want_to_read,reading,finished'])</code>. For updates you can use <code>$user-&gt;books()-&gt;syncWithoutDetaching([$book-&gt;id =&gt; ['status' =&gt; $data['status']]])</code>."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>Guests are redirected to login before saving or viewing a private list.</li><li>The selected status survives a refresh; removing a book removes only that user’s entry.</li><li>The desktop and mobile navigation both reach the new page.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Add optional personal notes, visible only to their owner.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x10-s03",
    "module": 10,
    "challenge": true,
    "title": "Protect and test reading lists",
    "time": "25–45 min",
    "intro": "Prove that reading-list data is private and reliable.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>Write feature tests that cover normal use and attempted access to another person’s reading-list entries.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Create <code>tests/Feature/ReadingListTest.php</code>. Revisit the feature-test patterns in Modules 05, 06 and 08.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Test guests</strong><p>Write tests for an unauthenticated visit and save request. Decide whether redirect-to-login is expected.</p></li><li><strong>Test the happy path</strong><p>With a signed-in user, save a book, change status and remove it. Assert database pivot state after each action.</p></li><li><strong>Test invalid input</strong><p>Submit an unknown status; check the validation response and confirm no invalid value was saved.</p></li><li><strong>Test isolation</strong><p>Create users A and B with the same book but different statuses. Make an authenticated request as A and verify B’s record remains untouched.</p></li><li><strong>Run regression tests</strong><p>Run your new test file and the full suite. Note one edge case you initially missed.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "How do you inspect the data?",
            "text": "The database table is <code>book_user</code>. An assertion against this table can prove the <code>user_id</code> and <code>status</code> really match."
          },
          {
            "title": "Use the right request identity",
            "text": "Build test requests with <code>$this-&gt;actingAs($user)</code>. The application should always obtain the user from authentication, not hidden form fields."
          },
          {
            "title": "Small code clue",
            "text": "A targeted assertion looks like <code>$this-&gt;assertDatabaseHas('book_user', ['user_id' =&gt; $user-&gt;id, 'book_id' =&gt; $book-&gt;id, 'status' =&gt; 'finished']);</code>."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>Tests cover guest, valid, invalid and cross-user scenarios.</li><li>An attempted change to user B’s data does not affect B’s record.</li><li>Existing core tests still pass.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Add a count of finished books on the reading-list page.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x11-s01",
    "module": 11,
    "challenge": true,
    "title": "Explore ratings data",
    "time": "35–55 min",
    "intro": "Build a trustworthy top-rated books query using existing reviews.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>Display the highest-rated books while avoiding the trap of treating a single five-star review as equally persuasive as many five-star reviews.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Inspect <code>app/Models/Book.php</code>, <code>app/Models/Review.php</code> and <code>BookController@index()</code>. Module 07 already introduced rating aggregates, so build on them.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Define ranking rules</strong><p>Write down the minimum number of reviews required, how unrated books behave, and a tie-breaker (for example title).</p></li><li><strong>Prepare known data</strong><p>Create books with zero, one and several reviews. Include a five-star book with one review and a four-star book with many reviews.</p></li><li><strong>Build a top-rated query</strong><p>Use aggregate counts/averages in the database query, filter using your threshold, order by average, and paginate or limit the result set.</p></li><li><strong>Display the result</strong><p>Present title, average rating and number of reviews. Explain your minimum-review rule on the page.</p></li><li><strong>Check ordering</strong><p>Compare expected order against the page using your seeded data.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Don’t fetch all reviews",
            "text": "If you load every review into PHP just to calculate averages, the query will scale poorly. Look for database aggregates."
          },
          {
            "title": "Which existing functions?",
            "text": "Laravel offers <code>withAvg('reviews', 'rating')</code> and <code>withCount('reviews')</code>. Inspect the resulting attribute names."
          },
          {
            "title": "Small code clue",
            "text": "Start with <code>Book::query()-&gt;withAvg('reviews', 'rating')-&gt;withCount('reviews')</code>, then experiment with filtering and <code>orderByDesc('reviews_avg_rating')</code>."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>Books below the minimum-review threshold are omitted from the ranked list.</li><li>Ties have a predictable ordering and unrated books are handled deliberately.</li><li>No per-book review queries are required to show aggregates.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Offer two sorts: highest-rated and most-reviewed.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x11-s02",
    "module": 11,
    "challenge": true,
    "title": "Recommend something similar",
    "time": "35–55 min",
    "intro": "Add understandable “You might also like” suggestions to book pages.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>Show a short list of other books by one or more of the current book’s authors. Clearly explain why they were suggested.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Use the Book–Author relationship already built in Module 02. Work near <code>BookController@show</code> and the existing <code>books/show.blade.php</code> page.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Define simple rules</strong><p>Recommend at most five different books sharing an author with the current book. Exclude the current book itself.</p></li><li><strong>Prototype in Tinker</strong><p>Find author IDs on a book; use a relationship-aware query to find other books with any of those authors.</p></li><li><strong>Use efficient loading</strong><p>Load any author data required for cards in the same query, rather than querying once per displayed book.</p></li><li><strong>Integrate with book detail</strong><p>Pass recommendations to the view, add a “More by these authors” section and a useful empty message.</p></li><li><strong>Check difficult cases</strong><p>Try books with two authors, no shared authors and multiple matches. Watch out for duplicates.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Start at the relationship",
            "text": "A book already has <code>authors()</code>. Laravel can filter books based on related authors using <code>whereHas()</code>."
          },
          {
            "title": "Exclude the current record",
            "text": "Consider <code>whereKeyNot($book-&gt;getKey())</code>. Fetch author IDs using <code>$book-&gt;authors-&gt;modelKeys()</code> after loading the relationship."
          },
          {
            "title": "Small code clue",
            "text": "Inside a closure, <code>$query-&gt;whereIn('authors.id', $authorIds)</code> can restrict an <code>authors</code> relationship. Use <code>whereHas('authors', fn ($q) =&gt; ...)</code> on the outer Book query."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>No recommendation is the current book.</li><li>The list is capped and does not repeat the same book.</li><li>The empty state is clear when no other book shares an author.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Introduce a genre relationship and combine shared-genre and shared-author signals. Clearly label this as an optional schema change.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x11-s03",
    "module": 11,
    "challenge": true,
    "title": "Measure query performance",
    "time": "25–45 min",
    "intro": "Test that rankings and recommendations do not grow into an N+1 problem.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>Prove that your ratings page and related-book suggestions work efficiently and remain correct when the database grows.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Revisit the query-count test from Module 08 and create new feature tests, for example <code>tests/Feature/RecommendationsTest.php</code>.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Make repeatable fixtures</strong><p>Construct known ratings and author links that produce an unambiguous expected order.</p></li><li><strong>Test ranking logic</strong><p>Assert the minimum-review rule, average ordering and tie-breakers. Include an unrated book.</p></li><li><strong>Test recommendations</strong><p>Verify same-author matches, exclusion of the current book, result limit and empty state.</p></li><li><strong>Compare query counts</strong><p>Measure queries when displaying a small versus larger book list; repeat under comparable conditions.</p></li><li><strong>Fix any N+1 issue</strong><p>Inspect where the page accesses relationships. Add eager loading or aggregates only where required.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Re-use a known technique",
            "text": "Module 08 introduced testing for N+1 queries. You can adapt that test helper rather than creating a new performance tool."
          },
          {
            "title": "Watch for misleading tests",
            "text": "Don’t count queries for seeding. Enable your query recording only around the request under test."
          },
          {
            "title": "Small code clue",
            "text": "Look for <code>DB::listen()</code> or the query-count helper from Module 08, then compare requests with different fixture sizes. A query count growing by one per result suggests an N+1 problem."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>Automated tests prove both correctness and edge cases.</li><li>A written query-count comparison explains what you measured.</li><li>Any performance improvement leaves the expected output unchanged.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Show a “Recently reviewed” section and compare its query cost to your rankings page.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x12-s01",
    "module": 12,
    "challenge": true,
    "title": "Design the search interaction",
    "time": "40–60 min",
    "intro": "Plan an accessible, progressive enhancement of the existing search form. Follow the guided checkpoints and use the hints only if you need them.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>As someone types into the existing book search, update results without reloading the whole page. The original server-rendered form must still work if JavaScript is unavailable.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Start from the Module 07 catalogue search in <code>resources/views/books/index.blade.php</code>. Open developer tools and inspect the existing query string on the Books page.</p>"
      },
      {
        "type": "text",
        "title": "Choose one supported implementation path",
        "text": "<p>To reduce unnecessary complexity, use <strong>server-rendered HTML fragments</strong> for this extension. Laravel already knows how to draw the book cards. The browser only needs to request replacement HTML and display it. You do not need a separate JSON API or a new JavaScript framework.</p><p>The existing <code>GET /books?search=...</code> must continue to produce a complete HTML page for ordinary navigation.</p>"
      },
      {
        "type": "text",
        "title": "Start with these two Blade regions",
        "text": "<p>Open <code>resources/views/books/index.blade.php</code>. Find the search form and book grid. Give the form an ID, and wrap the results grid and pagination in a container with a stable ID. Add a status element that can announce loading or errors. Choose IDs consistently, as the JavaScript will look for them.</p>"
      },
      {
        "type": "code",
        "file": "books/index.blade.php · attributes to adapt · example to adapt",
        "text": "<form id=\"book-search\" method=\"GET\" action=\"{{ route('books.index') }}\">\n    <!-- Keep your existing search input and submit button -->\n</form>\n\n<p id=\"search-status\" role=\"status\" aria-live=\"polite\"></p>\n<div id=\"book-results\">\n    <!-- Existing book grid and pagination go here -->\n</div>"
      },
      {
        "type": "text",
        "title": "Draw the sequence before coding",
        "text": "<p><strong>User types</strong> → wait approximately 300 ms → request search results → replace the grid → update the status message. If the user types again before a request finishes, the older result must not overwrite the newer one.</p><p><strong>First checkpoint:</strong> without any JavaScript, submitting the GET form still searches normally. The browser address should show <code>?search=...</code>.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Describe desired behaviour</strong><p>Write a short scenario for typing, deleting characters, zero matches, slow responses and a failed request.</p></li><li><strong>Choose a response format</strong><p>Compare returning a small HTML fragment with returning JSON. Choose one and explain how it will update the existing results region.</p></li><li><strong>Mark up the interface</strong><p>Identify the search input, results container and status message. Plan keyboard and screen-reader-friendly status updates.</p></li><li><strong>Preserve normal submission</strong><p>Keep the search form’s server-rendered GET behaviour so it works when JavaScript is disabled.</p></li><li><strong>Make a request sketch</strong><p>Outline event → debounce → fetch → update results. Decide how stale responses will be ignored.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Avoid a new framework",
            "text": "You can do this with ordinary JavaScript and Laravel. You need no Vue, Livewire or extra package."
          },
          {
            "title": "Search should degrade gracefully",
            "text": "Don’t remove the existing <code>&lt;form method=\"GET\"&gt;</code>. JavaScript should enhance it; the URL remains useful when scripts are disabled."
          },
          {
            "title": "Small code clue",
            "text": "A non-visual status element might be <code>&lt;p id=\"search-status\" role=\"status\" aria-live=\"polite\"&gt;&lt;/p&gt;</code>. Give the results region a stable ID so the script can update it."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>The form still works with JavaScript disabled.</li><li>The plan addresses loading, errors, no matches and accessibility.</li><li>Your chosen HTML/JSON response format has a clear reason.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Keep the current search term in the URL so users can bookmark or share their search.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x12-s02",
    "module": 12,
    "challenge": true,
    "title": "Make search update live",
    "time": "50–75 min",
    "intro": "Connect the browser input to the existing Laravel search behaviour. Follow the guided checkpoints and use the hints only if you need them.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>Use the existing search logic to fetch and display matching books as the user types, without adding a framework.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Work in the existing books index view, a small JavaScript file loaded by your layout/build setup, and a Laravel route or controller action. Reuse Module 07’s search scope.</p>"
      },
      {
        "type": "text",
        "title": "Keep the server response small",
        "text": "<p>First move the existing book results markup (including pagination) into a new partial such as <code>resources/views/books/partials/results.blade.php</code>. In the full index view, use <code>@include('books.partials.results')</code> inside the <code>book-results</code> container. Both the full page and the live search response can now reuse that one partial.</p>"
      },
      {
        "type": "text",
        "title": "A controller pattern to adapt",
        "text": "<p>Update <code>BookController@index(Request $request)</code> <strong>after</strong> it prepares the filtered <code>$books</code> collection. If the request asks for a fragment, return only the partial. Otherwise, return the existing full-page view. Do not duplicate the search query.</p>"
      },
      {
        "type": "code",
        "file": "BookController@index · after building $books · example to adapt",
        "text": "if ($request->header('X-Search-Fragment') === '1') {\n    return view('books.partials.results', compact('books'));\n}\n\nreturn view('books.index', compact('books'));"
      },
      {
        "type": "text",
        "title": "Begin with one fetch, not the entire script",
        "text": "<p>Create <code>resources/js/live-search.js</code>, or add code to an existing JS entry point. Ensure your build loads it (for example, import it from <code>resources/js/app.js</code> in a Vite-based Breeze project). First test a single request in the browser console. It should return markup containing the expected book cards.</p>"
      },
      {
        "type": "code",
        "file": "resources/js/live-search.js · request example · example to adapt",
        "text": "const form = document.querySelector('#book-search');\nconst results = document.querySelector('#book-results');\nconst input = form?.querySelector('input[name=\"search\"]');\n\nif (form && results && input) {\n    const url = new URL(form.action);\n    url.searchParams.set('search', input.value);\n    // Test this request before adding the input event handler.\n    fetch(url, { headers: { 'X-Search-Fragment': '1' } })\n        .then(response => {\n            if (!response.ok) throw new Error('Search failed');\n            return response.text();\n        })\n        .then(html => { results.innerHTML = html; })\n        .catch(error => console.error(error));\n}"
      },
      {
        "type": "text",
        "title": "Now add responsive behaviour",
        "text": "<ol><li><strong>Typing:</strong> attach an <code>input</code> event listener and read <code>input.value</code>.</li><li><strong>Debouncing:</strong> keep a timer variable. On every keystroke, call <code>clearTimeout(timer)</code>, then set a new <code>setTimeout(..., 300)</code>.</li><li><strong>Older requests:</strong> create an <code>AbortController</code> per request; abort the previous one before starting the next. Also check that the returned search term still matches the latest input before updating the grid.</li><li><strong>Status:</strong> write simple messages into <code>search-status</code> with <code>textContent</code> (for example “Searching…” or “Unable to load results”). Ignore deliberate abort errors.</li><li><strong>Pagination:</strong> initially, let pagination links navigate normally. Dynamic pagination can be a stretch goal.</li></ol>"
      },
      {
        "type": "code",
        "file": "live-search.js · debounce pattern (adapt) · example to adapt",
        "text": "let timer;\ninput.addEventListener('input', () => {\n    clearTimeout(timer);\n    timer = setTimeout(() => {\n        // Call your async search function with input.value here.\n    }, 300);\n});"
      },
      {
        "type": "text",
        "title": "Common errors and how to recognise them",
        "text": "<p><strong>The entire layout appears inside the results area:</strong> the request did not include the fragment header, or the controller returned the full view. <strong>Nothing happens when typing:</strong> check the browser console, the CSS selectors and whether the JS file is imported by Vite. <strong>Results jump backwards:</strong> an older response is replacing a newer one; check abort and current-query logic.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Return suitable results</strong><p>Implement a lightweight endpoint or conditional response using the existing search scope. Keep normal GET requests returning the full view.</p></li><li><strong>Listen for input</strong><p>Read the search field value and construct a URL with <code>URLSearchParams</code>. Avoid hand-building an unescaped query string.</p></li><li><strong>Debounce network calls</strong><p>Delay each request by around 250–350 ms. Reset the timer when input changes.</p></li><li><strong>Prevent stale updates</strong><p>Abort the previous request or track a request sequence number before rendering new results.</p></li><li><strong>Render feedback safely</strong><p>Show loading, no-results and errors. Prefer safe text insertion or trusted server-rendered HTML over unescaped strings.</p></li><li><strong>Check real interactions</strong><p>Type quickly, delete the term, and throttle the network. Confirm the page never reverts to outdated results.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Build one small piece first",
            "text": "Get a single <code>fetch()</code> request working in the console before adding the input handler and debouncing."
          },
          {
            "title": "Two browser tools",
            "text": "Use <code>setTimeout()</code> / <code>clearTimeout()</code> for a debounce, and <code>AbortController</code> to cancel superseded fetches."
          },
          {
            "title": "Small code clue",
            "text": "Start with <code>const url = new URL(form.action); url.search = new URLSearchParams({search: input.value});</code> followed by <code>fetch(url, {signal: controller.signal})</code>. Create a fresh controller for each request."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>Results update without a full navigation while JavaScript is enabled.</li><li>Rapid typing never leaves a stale result list on screen.</li><li>Errors and empty matches produce understandable messages.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Add a simple sort control and retain the search term when sorting.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  },
  {
    "id": "x12-s03",
    "module": 12,
    "challenge": true,
    "title": "Test and refine live search",
    "time": "40–60 min",
    "intro": "Verify accessible behaviour, graceful errors and correct results. Follow the guided checkpoints and use the hints only if you need them.",
    "parts": [
      {
        "type": "text",
        "title": "Your brief",
        "text": "<p>Test the server response and the browser experience under realistic conditions.</p>"
      },
      {
        "type": "text",
        "title": "Where to begin",
        "text": "<p>Use browser developer tools and create feature tests for your chosen asynchronous endpoint, alongside the existing Module 07 search tests.</p>"
      },
      {
        "type": "text",
        "title": "Work through four concrete scenarios",
        "text": "<ol><li><strong>Normal form:</strong> disable JavaScript, search for an existing book, and confirm the full page still works.</li><li><strong>Fragment response:</strong> request <code>/books?search=Dune</code> with the <code>X-Search-Fragment: 1</code> header. The response should contain book results but <em>not</em> the application layout.</li><li><strong>Empty results:</strong> search for a distinctive nonsense term. The existing Blade empty state should appear inside the results container.</li><li><strong>Slow network:</strong> in browser dev tools, throttle network speed. Type two different searches quickly and confirm the older response never replaces the newer one.</li></ol>"
      },
      {
        "type": "text",
        "title": "A small feature-test starting point",
        "text": "<p>Create a new feature test (or extend <code>BookTest</code>). Use a signed-in account if the Books route requires authentication, as it does in the core walkthrough. Assert the fragment contains a matching title but not the surrounding page header.</p>"
      },
      {
        "type": "code",
        "file": "tests/Feature/BookSearchTest.php · test idea · example to adapt",
        "text": "public function test_search_fragment_returns_matching_books(): void\n{\n    $user = User::factory()->create();\n    Book::factory()->create(['title' => 'Dune']);\n\n    $response = $this->actingAs($user)\n        ->withHeader('X-Search-Fragment', '1')\n        ->get(route('books.index', ['search' => 'Dune']));\n\n    $response->assertOk()->assertSee('Dune');\n    $response->assertDontSee('<html', false);\n}"
      },
      {
        "type": "text",
        "title": "Check accessibility and recovery",
        "text": "<p>Use only the keyboard to reach and type in the search field. The <code>role=\"status\"</code> element should announce changes without stealing focus. Temporarily disconnect the network and confirm the page shows an understandable message rather than silently failing. Test an empty search term to restore the whole catalogue.</p><p><strong>Final regression:</strong> run <code>php artisan test --filter=BookSearchTest</code>, <code>php artisan test</code>, and test ordinary search with JavaScript disabled.</p>"
      },
      {
        "type": "text",
        "title": "Your implementation roadmap",
        "text": "<ol class=\"challenge-roadmap\"><li><strong>Protect the old behaviour</strong><p>Disable JavaScript and confirm GET search still produces the correct page and URL.</p></li><li><strong>Test server responses</strong><p>Write Laravel tests for a match, empty results, and a request with unexpected/missing parameters.</p></li><li><strong>Simulate a race</strong><p>Use network throttling: make query A slow and query B fast. Confirm A cannot overwrite B after B has appeared.</p></li><li><strong>Check accessibility</strong><p>Navigate using only the keyboard. Ensure loading and result-count updates are announced appropriately.</p></li><li><strong>Check errors and regressions</strong><p>Simulate offline/failed requests and verify a useful status. Run both search tests and the full suite.</p></li></ol>"
      },
      {
        "type": "hint",
        "title": "Progressive hints",
        "levels": [
          {
            "title": "Test both modes",
            "text": "A successful JSON or fragment test is not enough. The original Blade page is still part of the feature."
          },
          {
            "title": "Find races in dev tools",
            "text": "Browser network throttling makes a delayed request easy to observe. Ensure your script discards a response if it is no longer current."
          },
          {
            "title": "Small code clue",
            "text": "For a JSON response, inspect <code>$response-&gt;assertOk()-&gt;assertJsonStructure([...])</code>. For an HTML fragment, assert the expected content and response type. Test whichever format you actually built."
          }
        ]
      },
      {
        "type": "text",
        "title": "Check your implementation",
        "text": "<ul class=\"challenge-checklist\"><li>Old-style search still works without JavaScript.</li><li>Out-of-order responses, empty results and network errors are handled.</li><li>Both automated checks and a short manual browser checklist are complete.</li></ul>"
      },
      {
        "type": "text",
        "title": "Stretch goal",
        "text": "<p>Add a small “Clear search” control that restores the original catalogue.</p>"
      }
    ],
    "q": "Which approach best fits this challenge?",
    "options": [
      "Start by defining the required behaviour and verifying it with tests.",
      "Copy the finished repository and assume the extension is already implemented.",
      "Skip permission and error checks until the project is deployed."
    ],
    "answer": 0,
    "feedback": "A clear definition of success makes an independent implementation easier to design and assess."
  }
];
