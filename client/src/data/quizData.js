export const quizData = {
    "JAVA": [
        { id: 1, question: "What is the size of int variable?", options: ["8 bit", "16 bit", "32 bit", "64 bit"], answer: "32 bit" },
        { id: 2, question: "Which of the following is not a Java features?", options: ["Dynamic", "Architecture Neutral", "Use of pointers", "Object-oriented"], answer: "Use of pointers" },
        { id: 3, question: "The \\u0021 article referred to as a", options: ["Unicode escape sequence", "Octal escape", "Hexadecimal", "Line feed"], answer: "Unicode escape sequence" },
        { id: 4, question: "_____ is used to find and fix bugs in the Java programs.", options: ["JVM", "JRE", "JDK", "JDB"], answer: "JDB" },
        { id: 5, question: "Which of the following is a valid declaration of a char?", options: ["char ch = '\\utea';", "char ch = '\\u0223';", "char ch = '\\utea';", "char ch = 'tea';"], answer: "char ch = '\\u0223';" },
        { id: 6, question: "What is the return type of the hashCode() method in the Object class?", options: ["Object", "int", "long", "void"], answer: "int" },
        { id: 7, question: "Which of the following is a marker interface?", options: ["Runnable", "Remote", "Readable", "Result"], answer: "Remote" },
        { id: 8, question: "Which package contains the Random class?", options: ["java.util package", "java.lang package", "java.awt package", "java.io package"], answer: "java.util package" },
        { id: 9, question: "An interface with no fields or methods is known as a ______.", options: ["Runnable Interface", "Marker Interface", "Abstract Interface", "CharSequence Interface"], answer: "Marker Interface" },
        { id: 10, question: "In which memory a String is stored, when we create a string using new operator?", options: ["Stack", "String memory", "Heap memory", "Random storage space"], answer: "Heap memory" }
    ],
    "DBMS": [
        { id: 1, question: "What does DBMS stand for?", options: ["Domain Base Management System", "Data Base Management System", "Digital Base Mapping System", "Data Base Mapping System"], answer: "Data Base Management System" },
        { id: 2, question: "Which of the following is not a type of database?", options: ["Hierarchical", "Network", "Distributed", "Decentralized"], answer: "Decentralized" },
        { id: 3, question: "Which of the following is a component of DBMS?", options: ["Data", "Data Languages", "Data Manager", "All of the above"], answer: "All of the above" },
        { id: 4, question: "Which of the following is known as a set of entities of the same type that share the same properties, or attributes?", options: ["Relation set", "Tuples", "Entity set", "Entity Relation model"], answer: "Entity set" },
        { id: 5, question: "What is information?", options: ["Processed Data", "Raw Data", "Input Data", "Organized Data"], answer: "Processed Data" },
        { id: 6, question: "What represents an attribute in a relational database?", options: ["Table", "Row", "Column", "Object"], answer: "Column" },
        { id: 7, question: "ACID properties of a transaction are:", options: ["Atomicity, Consistency, Isolation, Durability", "Atomicity, Concurrency, Isolation, Durability", "Atomicity, Consistency, Integrity, Durability", "Atomicity, Consistency, Isolation, Data"], answer: "Atomicity, Consistency, Isolation, Durability" },
        { id: 8, question: "Which command is used to remove a relation from an SQL?", options: ["Drop table", "Delete", "Purge", "Remove"], answer: "Drop table" },
        { id: 9, question: "Which of the following is a constraint in SQL?", options: ["Primary Key", "Foreign Key", "Not Null", "All of the above"], answer: "All of the above" },
        { id: 10, question: "What is a view in SQL?", options: ["A virtual table", "A stored procedure", "A trigger", "A real table"], answer: "A virtual table" }
    ],
    "Machine Learning": [
        { id: 1, question: "What is Machine Learning?", options: ["The autonomous acquisition of knowledge through the use of computer programs", "The autonomous acquisition of knowledge through the use of manual programs", "The selective acquisition of knowledge through the use of computer programs", "The selective acquisition of knowledge through the use of manual programs"], answer: "The autonomous acquisition of knowledge through the use of computer programs" },
        { id: 2, question: "Which of the following is not a type of Machine Learning?", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deduced Learning"], answer: "Deduced Learning" },
        { id: 3, question: "Which of the following is a supervised learning algorithm?", options: ["K-Means", "Random Forest", "Apriori", "PCA"], answer: "Random Forest" },
        { id: 4, question: "What is overfitting?", options: ["Model fits the training data too well", "Model does not fit the training data well", "Model fits the test data too well", "Model is perfect"], answer: "Model fits the training data too well" },
        { id: 5, question: "What is the full form of SVM?", options: ["Support Vector Machine", "System Vector Machine", "Supervised Vector Machine", "Support Vector Mechanics"], answer: "Support Vector Machine" },
        { id: 6, question: "Which of the following is used for dimensionality reduction?", options: ["PCA", "SVM", "KNN", "Naive Bayes"], answer: "PCA" },
        { id: 7, question: "Which of the following is an example of a classification problem?", options: ["Predicting house prices", "Grouping customers", "Predicting if an email is spam", "Predicting temperature"], answer: "Predicting if an email is spam" },
        { id: 8, question: "What is a neuron in a neural network?", options: ["A mathematical function", "A database", "A hardware component", "A programming language"], answer: "A mathematical function" },
        { id: 9, question: "Which of the following is a deep learning framework?", options: ["React", "Django", "TensorFlow", "Laravel"], answer: "TensorFlow" },
        { id: 10, question: "What is bagging?", options: ["Bootstrap Aggregating", "Boosting Aggregating", "Bootstrap Association", "Boosting Association"], answer: "Bootstrap Aggregating" }
    ],
    "NLP": [
        { id: 1, question: "What is NLP?", options: ["Natural Language Processing", "Neural Language Processing", "Natural Learning Processing", "Neural Learning Processing"], answer: "Natural Language Processing" },
        { id: 2, question: "Which of the following is a component of NLP?", options: ["NLU", "NLG", "Both A and B", "None of the above"], answer: "Both A and B" },
        { id: 3, question: "What is Tokenization?", options: ["Splitting text into sentences or words", "Converting text to audio", "Translating text", "Summarizing text"], answer: "Splitting text into sentences or words" },
        { id: 4, question: "What is Stemming?", options: ["Reducing words to their root form", "Expanding words", "Tokenizing words", "Removing stop words"], answer: "Reducing words to their root form" },
        { id: 5, question: "Which of the following is a stop word?", options: ["The", "Run", "Fast", "Computer"], answer: "The" },
        { id: 6, question: "What does TF-IDF stand for?", options: ["Term Frequency-Inverse Document Frequency", "Term Frequency-Inverse Data Frequency", "Total Frequency-Inverse Document Frequency", "Total Frequency-Inverse Data Frequency"], answer: "Term Frequency-Inverse Document Frequency" },
        { id: 7, question: "What is Named Entity Recognition (NER)?", options: ["Identifying names of people, organizations, etc.", "Translation", "Summarization", "Sentiment Analysis"], answer: "Identifying names of people, organizations, etc." },
        { id: 8, question: "Which library is commonly used for NLP in Python?", options: ["NLTK", "Pandas", "NumPy", "Matplotlib"], answer: "NLTK" },
        { id: 9, question: "What is Sentiment Analysis?", options: ["Determining the emotional tone", "Translating language", "Recognizing speech", "Generating text"], answer: "Determining the emotional tone" },
        { id: 10, question: "What is a Bag of Words?", options: ["A representation of text", "A type of database", "A neural network", "A sorting algorithm"], answer: "A representation of text" }
    ],
    "DLCO": [
        { id: 1, question: "What does DLCO stand for?", options: ["Digital Logic and Computer Organization", "Data Logic and Computer Organization", "Digital Learning and Computer Organization", "Digital Logic and Control Organization"], answer: "Digital Logic and Computer Organization" },
        { id: 2, question: "Which gate is known as the universal gate?", options: ["AND", "OR", "NAND", "XOR"], answer: "NAND" },
        { id: 3, question: "What is the binary equivalent of decimal 10?", options: ["1010", "1001", "1100", "1110"], answer: "1010" },
        { id: 4, question: "Which of the following is a volatile memory?", options: ["ROM", "RAM", "Hard Disk", "CD"], answer: "RAM" },
        { id: 5, question: "What is a Flip-Flop?", options: ["A bistable multivibrator", "A monostable multivibrator", "A astable multivibrator", "A logic gate"], answer: "A bistable multivibrator" },
        { id: 6, question: "Which architecture uses separate buses for instruction and data?", options: ["Von Neumann", "Harvard", "Princeton", "None of the above"], answer: "Harvard" },
        { id: 7, question: "What is a multiplexer?", options: ["Data selector", "Data distributor", "Data encoder", "Data decoder"], answer: "Data selector" },
        { id: 8, question: "How many bits are in a byte?", options: ["4", "8", "16", "32"], answer: "8" },
        { id: 9, question: "What is the function of the ALU?", options: ["Arithmetic and Logical Operations", "Control Operations", "Storage Operations", "Input/Output Operations"], answer: "Arithmetic and Logical Operations" },
        { id: 10, question: "Which is the fastest memory?", options: ["Cache", "RAM", "Hard Disk", "Register"], answer: "Register" }
    ]
};
