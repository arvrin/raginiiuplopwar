# Contributing to Raginii Uplopwar Website

Thank you for your interest in contributing to this project! We welcome contributions that help improve the website.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists in [Issues](https://github.com/arvrin/raginiiuplopwar/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and device information

### Suggesting Enhancements

We welcome suggestions for:
- UI/UX improvements
- Performance optimizations
- New features
- Documentation improvements

Please create an issue with the `enhancement` label.

## 💻 Development Process

### Getting Started

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/raginiiuplopwar.git
   cd raginiiuplopwar
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

### Making Changes

1. **Start development server**
   ```bash
   npm start
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Test on multiple browsers
   - Ensure mobile responsiveness

3. **Test your changes**
   ```bash
   npm run build:prod
   # Check dist/ folder output
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   # or "fix: resolve bug"
   ```

### Submitting Changes

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill in the template
   - Link related issues

## 📝 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain consistent indentation (4 spaces)
- Include alt text for images
- Ensure accessibility (ARIA labels where needed)

### CSS
- Follow existing naming conventions
- Use CSS variables for colors and spacing
- Mobile-first approach
- Comment complex styles

### JavaScript
- Use ES6+ features
- Write clear, descriptive variable names
- Add comments for complex logic
- Avoid console.log in production code

### Commit Messages

Follow conventional commits format:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(contact): add phone number validation
fix(navbar): resolve mobile menu overflow
docs(readme): update installation instructions
perf(images): implement lazy loading
```

## 🧪 Testing

Before submitting a PR:

- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices (iOS & Android)
- [ ] Check responsive design (320px to 1920px)
- [ ] Verify all links work
- [ ] Check console for errors
- [ ] Test forms (if applicable)
- [ ] Run PageSpeed Insights
- [ ] Ensure build succeeds: `npm run build:prod`

## 📁 Project Structure

```
raginiiuplopwar/
├── components/       # Reusable JS components
├── css/             # Stylesheets
├── js/              # Main JavaScript
├── images/          # Image assets
├── scripts/         # Build scripts
├── docs/            # Documentation
├── *.html          # Page templates
└── dist/           # Production build (auto-generated)
```

## 🚫 What Not to Do

- ❌ Don't commit `node_modules/`
- ❌ Don't commit build artifacts (.zip, .tar.gz)
- ❌ Don't include personal/sensitive data
- ❌ Don't make unrelated changes in one PR
- ❌ Don't use console.log in production
- ❌ Don't break existing functionality

## ✅ Pull Request Checklist

- [ ] Branch is up to date with `main`
- [ ] Code follows project style guidelines
- [ ] No console errors
- [ ] Tested on multiple browsers
- [ ] Mobile responsive
- [ ] Build succeeds (`npm run build:prod`)
- [ ] Commit messages follow convention
- [ ] PR description explains changes
- [ ] Related issues are linked

## 🔄 Review Process

1. **Automated checks** run on your PR
2. **Maintainer review** (may request changes)
3. **Approval** and merge
4. **Automatic deployment** to GitHub Pages

## 💡 Tips

- **Small PRs** are easier to review
- **One feature per PR** keeps things focused
- **Ask questions** if you're unsure
- **Be patient** - reviews may take time
- **Be respectful** in all communications

## 📞 Getting Help

- Check [docs/](docs/) for documentation
- Ask in [Discussions](https://github.com/arvrin/raginiiuplopwar/discussions)
- Create an [Issue](https://github.com/arvrin/raginiiuplopwar/issues)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🙏

Every contribution, no matter how small, helps make this project better.
