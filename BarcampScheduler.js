Tracks = new Meteor.Collection("Tracks");
Talks = new Meteor.Collection("Talks");
Slots = new Meteor.Collection("Slots");

if(Meteor.isServer) {

	var allowAll = {

		insert: function() { return true },
		update: function() { return true },
		remove: function() { return true },

	};

	Tracks.allow(allowAll);
	Talks.allow(allowAll);
	Slots.allow(allowAll);

	Meteor.startup(function() {

		if (Slots.find().count() === 0 && Tracks.find().count() === 0 && Talks.find({track: {$lt: 0}}).count() === 0) {
		
			Slots.insert({slot: 1,  start: 1351965600, end: 1351967400 });
			Slots.insert({slot: 2,  start: 1351967400, end: 1351969200 });
			Slots.insert({slot: 3,  start: 1351969200, end: 1351971600 });
			Slots.insert({slot: 4,  start: 1351972200, end: 1351974600 });
			Slots.insert({slot: 5,  start: 1351975200, end: 1351977600 });
			Slots.insert({slot: 6,  start: 1351978200, end: 1351980600 });
			Slots.insert({slot: 7,  start: 1351981200, end: 1351983600 });
			Slots.insert({slot: 8,  start: 1351983600, end: 1351986000 });
			Slots.insert({slot: 9,  start: 1351986000, end: 1351988400 });
			Slots.insert({slot: 10,  start: 1351989000, end: 1351991400 });
			Slots.insert({slot: 11,  start: 1351992000, end: 1351994400 });
			Slots.insert({slot: 12,  start: 1351994400, end: 1351995300 });
			Slots.insert({slot: 13,  start: 1351998000, end: 1351965600 });

			Tracks.insert({name: "Space Pad", track: 1 });
			Tracks.insert({name: "The Bend", track: 2 });
			Tracks.insert({name: "Dog Pound", track: 3 });

			Talks.insert({name: "Registration", title: "", description: "", track: -1, slot: 1 });
			Talks.insert({name: "Schedule Creation", title: "", description: "", track: -1, slot: 2 });
			Talks.insert({name: "Supper", title: "", description: "", track: -1, slot: 8 });
			Talks.insert({name: "Beercamp", title: "", description: "Beercamp starts after tear down", track: -1, slot: 13 });
			Talks.insert({name: "Dave Mosher", title: "So, You want to be a Front-End Engineer.", description: "Browsers: The Final Frontier. The most volatile programming platform the world has ever known. You’re a seasoned engineer who has mastered the art of server-side dev. You’ve conquered .NET, Java, and many more. You know a little bit about the strange new world of client-side development and you’d like to take your understanding to the next level. Good! Our mission: to explore the implementation details of the Browser, HTML, CSS, and JavaScript; to examine the tools and techniques that will help you boldly go where few have gone before, from Hacker to Front-End Engineer.", track: 1, slot: 3 });
			Talks.insert({name: "Kari Halsted", title: "How a Little Python Made a Big Blue Elephant Dance", description: "I’ve never considered myself to be a programmer, but here’s a story about how I learned to code a little, and used it change the conversation around the design of the software product I work on … and beyond.", track: 2, slot: 3 });
			Talks.insert({name: "Allan Dowdeswell", title: "How Haxe Developers Are Going To Take Over The World", description: "If you know JavaScript, Java, ActionScript or PHP, you are well on your way to becoming a Haxe developer. Haxe compiles to: Windows, MacOSX, and Linux. Oh, and JavaScript, HTML5, Flash, AS3, PHP, C++, C#, Java, iOS, PhoneGap, Android, WebOS, BlackBerry. One language to rule them all: server, browser, desktop, and mobile.", track: 3, slot: 3 });
			Talks.insert({name: "Melanie Cey", title: "DevOps – Why put the Ops in Dev", description: "You may have heard the term “devops” floating around over the last few years. Recently, there has been an explosion in adoption of the practices outlined as part of the movement. As a developer turned systems administrator, I have first hand experience and understanding of both functional and non-functional requirements. I’d like to cover the principles, how the movement started and has recently gained steam with some big players. I will give an overview of the change in our operations and system stability overall since we began to adopt the practices related to DevOps.", track: 1, slot: 4 });
			Talks.insert({name: "Ryan Smith & Chris Morin", title: "Ominocity’s Guide to Going Viral", description: "How to write articles with the best chance of going viral, what to do once they’re written, and how to survive a flood of traffic. Also introducing the Ominocity BarCamp drinking game!", track: 2, slot: 4 });
			Talks.insert({name: "Jeff Pihach", title: "Use YUI to lower project development costs", description: "Deciding what technology to use on a new or existing project has a huge effect on the time, satisfaction, and costs of that project. I’ll be running through the process I used when deciding to go with YUI for web and application development and point out the features today which make YUI a clear leader for development teams of any size.", track: 3, slot: 4 });
			Talks.insert({name: "Colleen Hardie", title: "Distance Team Building: How I learned to stop worrying and love Diablo III", description: "Over the years, I’ve lead several teams; two of them have been lead from a distance. This will be a talk about team building and how it can be achieved in a virtual space.", track: 1, slot: 5 });
			Talks.insert({name: "Kim Schmidt", title: "Get Your $#!/ Together!", description: "Lists can make all the difference in what you accomplish or want to accomplish. So can bookmarking. Check out some list making tools, and help us compose a super list of helpful websites and books for designers, developers, nerds and more using hackpad.", track: 2, slot: 5 });
			Talks.insert({name: "Aaron Genest", title: "KinectArms: Showing PEOPLE in applications", description: "People don’t just talk or write to communicate, they gesture. I’ll show you a toolkit for rapidly adding gesture visualizations or for incorporating gesture-based interactions in any application. The toolkit, KinectArms, relies on a standard Microsoft Kinect, provides detailed data about hands and arms, and comes with a set of stock visualizations for showing gestures in shared spaces.", track: 3, slot: 5 });
			Talks.insert({name: "Chris de Jong", title: "GIFs! For Fun And Profit ", description: "From languishing in the dark recesses of forgotten Geocities websites to becoming the default lingua franca of Internet culture, the venerable GIF has had long and colourful history in its almost 25 years of existence. A semi-deep dive into the history of the file format, its death, resurgence and evolution on the net as a medium for art and advertising. Plus, how to make your own GIFs across a variety of platforms!", track: 1, slot: 6 });
			Talks.insert({name: "Chad McCallum", title: "Hackers, Hackathons and You", description: "Trying to derail the media-driven stereotype of a “hacker” and take it back to the makers and the coders. What makes you a hacker, why are hackathons important, and most of all – how you can get involved. Mostly a discussion steered by real-world examples, slides, and video clips.", track: 2, slot: 6 });
			Talks.insert({name: "Chad McCallum ", title: "Single Page Apps and the Web of Tomorrow", description: "With more and more client-side MVC libraries coming out, single page apps are here to stay. As a web dev, you may be asking some questions: Why is JavaScript cool now? What’s wrong with server-side MVC? Who’s JSON and what does he want with my data? Let’s review where we came from, where we are, and where we’re going with web application development.", track: 3, slot: 6 });
			Talks.insert({name: "Julian Sanders", title: "Social Media for professional use", description: "Social Media can be a powerful tool for work. Many people are intimidated or just don’t know what to do to use it effectively. I would like to share some of what worked for me and explain what tools I use.", track: 1, slot: 7 });
			Talks.insert({name: "Dan Merino", title: "Scaling your apps", description: "Can your apps handle the load? How many cloud instances will it require for you to run your architecture? How does your approach relate to costs? We will first go over the basics of scalability, how to test your application, and finally how to improve performance. There will be plenty of time for questions.", track: 2, slot: 7 });
			Talks.insert({name: "Marli Bells", title: "“Mom, It’s Scrum Master, not Scum Lord”: My Experience As A Scrum Master", description: "Scrum Mastering a web development team has been full of challenges and changes. Discussion on our version of Scrum and how it has been changed, what it’s like working on a team with a changing composition, and how we handle design and development work.", track: 3, slot: 7 });
			Talks.insert({name: "Reilly Forbes", title: "You Never Give Me Your Money: Crowdfunding strategies for Artists, Non-profits, and Business", description: "Crowdfunding is revolutionizing the way people generate capital to fund their ideas. From business start-ups, to artistic projects crowdfunding was used to generate an estimated 1.5 billion dollars in revenue in 2011. But at the same time almost half of all crowdfunding projects fail. This talk shares tips I’ve learned from my own successful campaign as well as some tricks that were passed on to me by Rockethub founder Brian Meece.", track: 1, slot: 9 });
			Talks.insert({name: "Blair Nordstrom", title: "How to Build an App in a Weekend ", description: "A lesson on synergy: the whole is really greater than the sum of its parts. The true story about how a developer, developer/designer, and marketer (myself) built an awesome mobile app in two days.", track: 2, slot: 9 });
			Talks.insert({name: "Depesh Parmar ", title: "Accelerators 101: The Hustle of Raising Capital ", description: "Do you have the next BILLION dollar startup but need cash and a team to bring it to market? Depesh Parmar, Co-Founder & Chief Operating Officer of Picatic will talk about the hustle of raising capital by being part of an accelerator program!", track: 3, slot: 9 });
			Talks.insert({name: "Kevin Stanley ", title: "Four Shades of Grey: The Seductive Appeal of Being Big Brother ", description: "Smartphones have taken the vision of ubiquitous computing from the laboratory to reality. These phones come equipped with a variety of high-precision sensors and interfaces to facilitate user interaction, communications and location-based services. These sensors can be repurposed to provide deep data on individual users, and can be compiled across groups to generate high-fidelity big data repositories, with shades of the overarching monitoring associated with Big Brother. However, not all applications are sinister. I will survey some recent applications studied in my lab and discuss the social benefits and moral hazards of gathering data directly from smartphones.", track: 1, slot: 10 });
			Talks.insert({name: "Kevin Stricker ", title: "Why Closed Is Cool ", description: "As an industry, software has come a long way since showing up on Microsoft’s doorstep with torches and pitchforks for bundling a browser with their operating system. In this talk I will take a broad look at software development, where its been, and some thoughts where it might be going.", track: 2, slot: 10 });
			Talks.insert({name: "Andre Mougeot ", title: "How To Change ", description: "There are things that get in our way each day at work – things we’d like to change. Maybe you wish there was a quicker way to get the resources you need, or perhaps there’s some part of your workflow that just bogs you down. Whatever you want to change, it has to start with you.  This discussion is meant to get your gear in drive and actually incite change in your workplace. We’ll talk about how to communicate clearly, how to try to understand what other people are going through, and how sometimes you need to “just do it” to get things to change.", track: 3, slot: 10 });
			Talks.insert({name: "Rhett Soveran ", title: "Building an Audience", description: "Everyone can build a website, but what do you do once you have one? How do you find and maintain an audience? You go to the bloggers for help and marketers (like me) start circling like sharks. SEO, they say. Social media, they say. High quality content too. What is really going to work? How do you discern between noise and knowledge? I’ve been responsible for a number of large media websites and I’d like to talk about platform thinking, sitting with a website for the longterm and ignoring the majority of marketers (especially anyone who talks about SEO).", track: 1, slot: 11 });
			Talks.insert({name: "Zach Scott & Colin Bendell", title: "Bitcoin and the price of Beer: Technology and Economics", description: "Bitcoin, a relatively new and definitely intriguing digital currency. In the last year, it has gone from boom to bust but is again on the upswing. In this talk we will present the technology behind Bitcoin, how it works and the economics – good and ill – of the bitcoin industry.", track: 2, slot: 11 });
			Talks.insert({name: "Mike Klein", title: "Fishing, Programming and Building a Sonar", description: "A short talk on how my love for fly fishing led me to hardware programing, app development and working a home made sonar (kind of). It’s a random story with electronics, programming, big ambitions and a string of failures.", track: 3, slot: 11 });
			Talks.insert({name: "Daryl Pierce", title: "An Ambisonic Player in HTML5 – stereo with a twist", description: "A simple demo of an application built with the new Web Audio API to deliver a complete spherical Ambisonic Soundfield to a web browser and a set of headphones.", track: 1, slot: 12 });
			Talks.insert({name: "Ryan Lejbak & Albert Jame", title: "Sask Peeps going to SXSW", description: "A ten minute meet-up with anyone who is going, interested in going or wants to know more about going to SXSW in March. There are lots of people from Saskatchewan attending and we should all hang out once or twice down there. We could meet during a break, exchange contact info, plan some parties and figure out where everyone is staying.", track: 2, slot: 12 });

		}

	});

}

if(Meteor.isClient) {
	
	Session.set('isAdmin', false);
	Session.set('isAdding', false);
	Session.set('talk-edit', undefined);

	Meteor.startup(timeMachine);

}