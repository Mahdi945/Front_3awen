import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Search query model
  searchQuery: string = '';
  
  // Example content to filter
  contentItems: any[] = [
    { title: 'Item 1', description: 'This is some text related to item 1. Keywords here: JavaScript, front-end.' },
    { title: 'Item 2', description: 'This text is related to item 2. Keywords: search, filter, JavaScript.' },
    { title: 'Item 3', description: 'This is item 3. It contains other text and some different keywords.' },
  ];

  // Function to filter content based on the search query
  searchContent() {
    const query = this.searchQuery.toLowerCase();

    // Filter the content items based on the search query
    this.contentItems.forEach(item => {
      const contentText = `${item.title} ${item.description}`.toLowerCase();
      // Here we just log the items that match the query (you can use this result to display content)
      if (contentText.includes(query)) {
        console.log('Found match:', item);
      }
    });
  }
}
