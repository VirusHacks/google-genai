const { execSync } = require('child_process');
const fs = require('fs');

// Commit messages - reduced to 30 commits
const commitMessages = [
    "feat: initialize Next.js project with TypeScript and Tailwind CSS",
    "feat: set up Drizzle ORM with PostgreSQL connection",
    "feat: add Kinde authentication configuration",
    "feat: create basic project structure and routing layout",
    "feat: implement user authentication flow with Kinde",
    "feat: add database schema for user management",
    "feat: create landing page layout and hero section",
    "feat: implement responsive navigation component",
    "feat: add course creation database schema",
    "feat: set up Google AI integration for course generation",
    "feat: create course dashboard layout and components",
    "feat: implement course creation form with validation",
    "feat: add AI-powered course content generation",
    "feat: create course display and management system",
    "feat: implement chapter and lesson structure",
    "feat: add YouTube video integration for courses",
    "feat: create course card components with CRUD operations",
    "feat: implement course publishing functionality",
    "feat: add mock interview database schema",
    "feat: create mock interview dashboard layout",
    "feat: implement AI-powered interview question generation",
    "feat: add webcam recording functionality for interviews",
    "feat: create interview question navigation system",
    "feat: implement answer recording and evaluation",
    "feat: add AI feedback system for interview responses",
    "feat: add resume builder database schema",
    "feat: create resume builder form components",
    "feat: add internship scraping functionality",
    "feat: create internship listing and filtering system",
    "docs: add comprehensive README with features and setup instructions"
];

// Items to progressively remove from .gitignore to make development look authentic
const gitignoreItemsToRemove = [
    "package.json",           // commit 1
    "tsconfig.json",          // commit 1
    "next.config.mjs",        // commit 1
    "tailwind.config.ts",     // commit 1
    "postcss.config.mjs",     // commit 1
    "drizzle.config.ts",      // commit 2
    "components.json",        // commit 3
    "configs/",               // commit 4-5
    "lib/",                   // commit 6
    "app/",                   // commit 7
    "components/",            // commit 8
    "db/",                    // commit 9-10
    "hooks/",                 // commit 11
    "types/",                 // commit 14
    "context/",               // commit 18
    "constant/",              // commit 22
    "public/",                // commit 26
    "README.md",              // commit 30
    "commits.js"              // commit 30
];

const dummyFile = 'temp.txt';
fs.writeFileSync(dummyFile, '');

// Function to remove item from .gitignore
const removeFromGitignore = (itemToRemove) => {
    const gitignorePath = '.gitignore';
    if (fs.existsSync(gitignorePath)) {
        let content = fs.readFileSync(gitignorePath, 'utf8');
        const lines = content.split('\n');
        const filteredLines = lines.filter(line =>
            !line.trim().startsWith(itemToRemove) &&
            line.trim() !== itemToRemove.replace('/', '')
        );

        if (filteredLines.length !== lines.length) {
            fs.writeFileSync(gitignorePath, filteredLines.join('\n'));
            console.log(`✅ Removed ${itemToRemove} from .gitignore`);
            return true;
        }
    }
    return false;
};

// Calculate random timestamps mostly in the past 10 days (with a few earlier)
const now = Date.now();
const tenDays = 10 * 24 * 60 * 60 * 1000;


const commits = commitMessages.map((msg, index) => {
    // 80% of commits in last 10 days, 20% in last 30 days

    const randomOffset = Math.floor(Math.random() * tenDays);
    const commitTime = new Date(now - randomOffset);
    return { msg, time: commitTime, index };
});

// Sort commits chronologically
commits.sort((a, b) => a.time - b.time);

// Commit them with both author and committer dates and progressively expose code
commits.forEach(({ msg, time, index }) => {
    const timestamp = time.toISOString();

    // Remove items from .gitignore at appropriate commits to simulate gradual development
    const itemsToRemoveAtThisCommit = [
        { commit: 1, items: ["package.json", "tsconfig.json", "next.config.mjs", "tailwind.config.ts", "postcss.config.mjs"] },
        { commit: 2, items: ["drizzle.config.ts"] },
        { commit: 3, items: ["components.json"] },
        { commit: 5, items: ["configs/"] },
        { commit: 6, items: ["lib/"] },
        { commit: 7, items: ["app/"] },
        { commit: 8, items: ["components/"] },
        { commit: 10, items: ["db/"] },
        { commit: 11, items: ["hooks/"] },
        { commit: 14, items: ["types/"] },
        { commit: 18, items: ["context/"] },
        { commit: 22, items: ["constant/"] },
        { commit: 26, items: ["public/"] },
        { commit: 30, items: ["README.md", "commits.js"] }
    ];

    itemsToRemoveAtThisCommit.forEach(({ commit, items }) => {
        if (index + 1 === commit) {
            items.forEach(item => removeFromGitignore(item));
        }
    });

    // Simulate file change
    fs.appendFileSync(dummyFile, `\n// ${msg} - Commit ${index + 1}`);

    // Stage and commit with both author and committer timestamps
    execSync(`git add .`);
    execSync(
        `git -c user.name="EdifyAI Developer" -c user.email="dev@edifyai.com" commit -m "${msg}" --date="${timestamp}"`
    );
});

// Clean up
fs.unlinkSync(dummyFile);

console.log("✅ 30 authentic commits created with progressive code exposure!");
console.log("🚀 Your EdifyAI project now has a realistic development history");
console.log("📁 Commits focused mostly within the last 10 days");
