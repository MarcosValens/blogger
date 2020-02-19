package com.esliceu.blogger.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "post")
public class Post {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idPost;

    @Column(name = "published")
    private LocalDate published;

    @Column(name = "updated")
    private LocalDate updated;

    @Column(name = "url")
    private String url;

    @Column(name = "title")
    private String title;

    @Column(name = "translatedTitle")
    private String translatedTitle;

    @Column(name = "translatedContent")
    private String translatedContent;

    @Column(name = "originalLanguage")
    private String originalLanguage;

    @Column(name = "translatedLanguage")
    private String translatedLanguage;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name = "user_email"), name = "user_email", nullable = false)
    private User user;

    public Post() {
    }

    public long getIdPost() {
        return idPost;
    }

    public void setIdPost(long idPost) {
        this.idPost = idPost;
    }

    public LocalDate getPublished() {
        return published;
    }

    public void setPublished(LocalDate published) {
        this.published = published;
    }

    public LocalDate getUpdated() {
        return updated;
    }

    public void setUpdated(LocalDate updated) {
        this.updated = updated;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTranslatedTitle() {
        return translatedTitle;
    }

    public void setTranslatedTitle(String translatedTitle) {
        this.translatedTitle = translatedTitle;
    }

    public String getTranslatedContent() {
        return translatedContent;
    }

    public void setTranslatedContent(String translatedContent) {
        this.translatedContent = translatedContent;
    }

    public String getOriginalLanguage() {
        return originalLanguage;
    }

    public void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public String getTranslatedLanguage() {
        return translatedLanguage;
    }

    public void setTranslatedLanguage(String translatedLanguage) {
        this.translatedLanguage = translatedLanguage;
    }
}
